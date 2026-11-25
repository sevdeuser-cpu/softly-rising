"""Softly Rising — procedural sound design library (no samples, everything synthesized).

All functions return float32 stereo arrays shaped (n, 2) at SR unless noted.
"""
import numpy as np
from scipy import signal
import wave

SR = 48000
rng = np.random.default_rng(42)


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def note(name):
    """'A4' -> Hz (also accepts 'C#5', 'Bb3')."""
    names = {"C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6,
             "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11}
    p, o = name[:-1], int(name[-1])
    midi = 12 * (o + 1) + names[p]
    return 440.0 * 2 ** ((midi - 69) / 12)


def env_adsr(n, a, d, s, r, curve=3.0):
    """Smooth ADSR envelope of length n samples (times in seconds)."""
    A, D, R = int(a * SR), int(d * SR), int(r * SR)
    S = max(0, n - A - D - R)
    seg = [
        1 - (1 - np.linspace(0, 1, A, endpoint=False)) ** curve,
        s + (1 - s) * (1 - np.linspace(0, 1, D, endpoint=False)) ** curve,
        np.full(S, s),
        s * (1 - np.linspace(0, 1, R)) ** curve,
    ]
    e = np.concatenate(seg)
    return np.pad(e, (0, max(0, n - len(e))))[:n]


def stereo(mono, pan=0.0):
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([mono * l, mono * r], axis=1)


def lowpass_sweep(x, f0, f1, q=0.7):
    """Time-varying low-pass (block-wise biquad) sweeping f0 -> f1 (exponential)."""
    out = np.zeros_like(x)
    block = 512
    n = len(x)
    zi = None
    for i in range(0, n, block):
        frac = i / max(1, n - 1)
        fc = f0 * (f1 / f0) ** frac
        b, a = signal.butter(2, min(fc, SR * 0.45) / (SR / 2), "low")
        seg = x[i:i + block]
        if zi is None:
            zi = np.zeros((max(len(a), len(b)) - 1, x.shape[1]))
        y, zi = signal.lfilter(b, a, seg, axis=0, zi=zi)
        out[i:i + block] = y
    return out


# ---------- instruments ----------

def pad_voice(freq, dur, detune=0.006, bright=0.35):
    """Warm pad: detuned additive saw-ish voices, slow vibrato."""
    t = t_axis(dur)
    vib = 1 + 0.0018 * np.sin(2 * np.pi * 4.7 * t + rng.random() * 6)
    out = np.zeros((len(t), 2))
    for k, (dt, pan) in enumerate([(-detune, -0.6), (0, 0), (detune, 0.6)]):
        f = freq * (1 + dt) * vib
        ph = 2 * np.pi * np.cumsum(f) / SR + rng.random() * 6
        wave_ = np.zeros_like(t)
        for h in range(1, 9):
            wave_ += (bright ** (h - 1)) * np.sin(h * ph) / h
        out += stereo(wave_, pan)
    return out / 3


def fm_bell(freq, dur, ratio=3.5, index=2.4, decay=2.2, pan=0.0):
    """Glassy FM bell."""
    t = t_axis(dur)
    ienv = index * np.exp(-t * 3.2)
    mod = np.sin(2 * np.pi * freq * ratio * t) * ienv
    car = np.sin(2 * np.pi * freq * t + mod)
    car += 0.35 * np.sin(2 * np.pi * freq * 2.01 * t) * np.exp(-t * 2.5)
    amp = np.exp(-t / decay * 2.2) * (1 - np.exp(-t * 900))
    return stereo(car * amp, pan)


def sparkle_cloud(dur, start=0.0, density=14, fmin=2200, fmax=5200, seed=3):
    """Tiny high sine grains, like stardust."""
    r = np.random.default_rng(seed)
    n = int(dur * SR)
    out = np.zeros((n, 2))
    count = int(density * (dur - start))
    for _ in range(count):
        t0 = start + r.random() * (dur - start - 0.3)
        f = r.uniform(fmin, fmax)
        L = int(r.uniform(0.08, 0.35) * SR)
        tt = np.arange(L) / SR
        g = np.sin(2 * np.pi * f * tt) * np.exp(-tt * r.uniform(10, 25)) * (1 - np.exp(-tt * 2000))
        i = int(t0 * SR)
        out[i:i + L] += stereo(g * r.uniform(0.05, 0.16), r.uniform(-0.9, 0.9))[: n - i]
    return out


def air_swell(dur, f0=300, f1=6000, amp=0.12):
    """Filtered noise 'breath' that rises."""
    noise = rng.standard_normal((int(dur * SR), 2))
    x = lowpass_sweep(noise, f0, f1)
    e = env_adsr(len(x), dur * 0.75, dur * 0.1, 0.4, dur * 0.15, curve=2)
    return x * e[:, None] * amp


def sub_bloom(freq, dur, amp=0.35):
    t = t_axis(dur)
    x = np.sin(2 * np.pi * freq * t) * env_adsr(len(t), 0.4, 0.5, 0.6, dur * 0.5)
    return stereo(x * amp)


# ---------- space ----------

def make_ir(dur=3.2, predelay=0.02, damp=0.6, seed=9):
    r = np.random.default_rng(seed)
    n = int(dur * SR)
    t = np.arange(n) / SR
    ir = r.standard_normal((n, 2)) * np.exp(-t * (6.9 / dur))[:, None]
    # darker tail: progressive low-pass
    b, a = signal.butter(1, 7000 / (SR / 2), "low")
    ir = signal.lfilter(b, a, ir, axis=0)
    ir *= (1 - damp * (t / dur))[:, None]
    ir = np.vstack([np.zeros((int(predelay * SR), 2)), ir])
    return ir / np.sqrt((ir ** 2).sum(axis=0))


def reverb(x, wet=0.35, dur=3.2):
    ir = make_ir(dur)
    y = np.stack([signal.fftconvolve(x[:, c], ir[:, c]) for c in range(2)], axis=1)
    out = np.zeros_like(y)
    out[: len(x)] += x * (1 - wet)
    out += y * wet
    return out


# ---------- utilities ----------

def place(dst, src, at):
    i = int(at * SR)
    if i >= len(dst):
        return dst
    m = min(len(src), len(dst) - i)
    dst[i:i + m] += src[:m]
    return dst


def master(x, peak_db=-1.0, fade_out=0.4):
    # gentle tilt EQ: tame low-mud, soft high shelf
    b, a = signal.butter(2, 40 / (SR / 2), "high")
    x = signal.lfilter(b, a, x, axis=0)
    # soft saturation for glue
    x = np.tanh(x * 1.2) / np.tanh(1.2)
    n = int(fade_out * SR)
    if n:
        x[-n:] *= np.linspace(1, 0, n)[:, None] ** 2
    peak = np.abs(x).max() + 1e-9
    return x * (10 ** (peak_db / 20) / peak)


def write_wav(path, x):
    x16 = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(x16.tobytes())
