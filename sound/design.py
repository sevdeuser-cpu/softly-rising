"""Generic score builder: timeline.json + voice.wav -> full sound design mix (mix.wav).

Layers: dreamy chord bed (changes per segment), wind air, stardust, transition whooshes,
per-segment bell accents (rising pentatonic), hook bloom, signature sting on the end card,
voice-driven ducking, then master.
"""
import json, sys
import numpy as np, soundfile as sf
from scipy import signal
sys.path.insert(0, "/home/user/softly-rising/sound")
from synth import (SR, note, pad_voice, fm_bell, sparkle_cloud, air_swell, sub_bloom, lowpass_sweep,
                   env_adsr, reverb, place, stereo, rng)
from signature import signature, HIT

CHORDS = [  # D major, soft & suspended voicings
    ["D3", "A3", "E4", "F#4", "C#5"],   # Dmaj9
    ["B2", "F#3", "D4", "E4", "A4"],    # Bm11
    ["G2", "D3", "B3", "F#4", "A4"],    # Gmaj9
    ["A2", "E3", "D4", "F#4", "B4"],    # A6sus
]
BELLS = ["D5", "E5", "F#5", "A5", "B5", "D6", "E6", "F#6", "A5", "B5", "D6", "E6"]


def chord_bed(timeline, total):
    bed = np.zeros((int(total * SR), 2))
    bounds = [0.0] + [s["start"] for s in timeline["segments"][1:]] + [total]
    for i in range(len(bounds) - 1):
        a, b = bounds[i], bounds[i + 1]
        dur = (b - a) + 1.2                      # overlap for crossfade
        ch = CHORDS[i % len(CHORDS)]
        x = sum(pad_voice(note(n), dur, bright=0.3) * g for n, g in zip(ch, [0.9, 0.7, 0.5, 0.4, 0.3]))
        x = lowpass_sweep(x, 900, 1800)
        e = env_adsr(len(x), 0.9, 0.3, 0.85, 1.2, curve=2)
        bed = place(bed, x * e[:, None], max(0, a - 0.3))
    return bed


def whoosh(dur=0.75):
    n = int(dur * SR)
    noise = rng.standard_normal((n, 2))
    x = lowpass_sweep(noise, 400, 9000)
    b, a = signal.butter(2, 300 / (SR / 2), "high"); x = signal.lfilter(b, a, x, axis=0)
    e = (np.linspace(0, 1, n) ** 2.2) * (1 - np.linspace(0, 1, n) ** 12)
    pan = np.linspace(-0.6, 0.6, n)
    return np.stack([x[:, 0] * e * (1 - pan) / 2, x[:, 1] * e * (1 + pan) / 2], axis=1) * 0.5


def riser(dur=0.7):
    """Tonal + noise swell that resolves on the cut."""
    n = int(dur * SR); t = np.arange(n) / SR
    f = 300 * (2400 / 300) ** (t / dur)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * 0.12
    x = stereo(tone) + lowpass_sweep(rng.standard_normal((n, 2)), 600, 12000) * 0.4
    return x * (np.linspace(0, 1, n) ** 2.6)[:, None] * 0.45


def impact():
    """Soft cinematic hit: sub thump + airy click, tuned to stay gentle."""
    n = int(1.2 * SR); t = np.arange(n) / SR
    f = 55 + 70 * np.exp(-t * 18)
    thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5)
    click = rng.standard_normal(n) * np.exp(-t * 60) * 0.35
    b, a = signal.butter(2, 3000 / (SR / 2), "low"); click = signal.lfilter(b, a, click)
    return stereo(thump * 0.55 + click)


def voice_envelope(voice, total):
    v = np.abs(voice if voice.ndim == 1 else voice.mean(axis=1))
    v = np.pad(v, (0, max(0, int(total * SR) - len(v))))[: int(total * SR)]
    b, a = signal.butter(1, 4 / (SR / 2), "low")
    env = signal.filtfilt(b, a, v)
    env = np.clip(env / (np.percentile(env, 95) + 1e-9), 0, 1)
    return env


def build(d):
    tl = json.load(open(f"{d}/timeline.json"))
    voice, vsr = sf.read(f"{d}/voice.wav", dtype="float32")
    assert vsr == SR
    total = tl["duration"]
    n = int(total * SR)
    music = np.zeros((n, 2))
    fx = np.zeros((n, 2))

    # bed + air + stardust
    music += chord_bed(tl, total)[:n] * 0.16
    music += sparkle_cloud(total, start=0.5, density=3.5, seed=11)[:n] * 0.5
    wind = rng.standard_normal((n, 2))
    b, a = signal.butter(2, [180 / (SR / 2), 900 / (SR / 2)], "band")
    music += signal.lfilter(b, a, wind, axis=0) * 0.012

    segs = tl["segments"]
    # hook: low bloom + first bell right on frame 1
    fx = place(fx, sub_bloom(note("D2"), 3.0, amp=0.32), 0.0)
    fx = place(fx, fm_bell(note("A5"), 3.0, index=1.8, decay=2.4) * 0.30, 0.05)
    fx = place(fx, sparkle_cloud(1.6, density=24, seed=2) * 0.7, 0.0)

    k = 0
    for i, s in enumerate(segs[1:], start=1):
        cut = s["start"] - 0.12                       # visual transition lands here
        fx = place(fx, riser(0.6) * 0.8, max(0, cut - 0.6))
        fx = place(fx, whoosh(0.55), max(0, cut - 0.32))
        fx = place(fx, impact() * 0.55, cut)
        if s.get("day") or s.get("title"):                                  # rising bell per day
            fx = place(fx, fm_bell(note(BELLS[k]), 3.0, index=2.0, decay=2.4, pan=(-0.3 if k % 2 else 0.3)) * 0.30, s["start"] - 0.02)
            fx = place(fx, sparkle_cloud(1.2, density=20, fmin=3000, fmax=7000, seed=20 + k) * 0.55, s["start"])
            k += 1

    # end card signature: bell lands HIT seconds after start
    cta_end = segs[-1]["end"]
    sig_start = cta_end + 0.25
    sig = signature(total=max(2.5, total - sig_start))
    music_end = sig_start  # fade bed under the sting
    fade = np.ones(n); i0 = int(music_end * SR); fade[i0:] = np.linspace(1, 0.15, n - i0) if n > i0 else 1
    music *= fade[:, None]
    fx = place(fx, sig * 0.55, sig_start)

    # space
    music = reverb(music, wet=0.3, dur=3.0)[:n]
    fx = reverb(fx, wet=0.32, dur=3.4)[:n]

    # ducking: music -9 dB under voice, fx -4 dB
    env = voice_envelope(voice, total)
    duck_m = 1 - 0.65 * env
    duck_f = 1 - 0.35 * env
    v = np.pad(voice, (0, max(0, n - len(voice))))[:n]
    vst = np.stack([v, v], axis=1)
    # voice polish: gentle high-pass + presence + a whisper of room
    b, a = signal.butter(2, 90 / (SR / 2), "high"); vst = signal.lfilter(b, a, vst, axis=0)
    # storyteller tone: warmth (low-mids) + air (breathy highs), then gentle compression
    b, a = signal.butter(2, [140 / (SR / 2), 380 / (SR / 2)], "band"); warm = signal.lfilter(b, a, vst, axis=0)
    b, a = signal.butter(2, 6500 / (SR / 2), "high"); air = signal.lfilter(b, a, vst, axis=0)
    vst = vst + 0.35 * warm + 0.45 * air
    lvl = np.sqrt(signal.filtfilt(*signal.butter(1, 8 / (SR / 2)), vst.mean(axis=1) ** 2) + 1e-9)
    thr = np.percentile(lvl, 70); gain = np.where(lvl > thr, (thr / lvl) ** 0.5, 1.0)
    vst = vst * gain[:, None]
    vst = vst / (np.abs(vst).max() + 1e-9) * 0.9
    vst = reverb(vst, wet=0.12, dur=1.6)[:n]

    mix = vst * 1.0 + music * duck_m[:, None] + fx * duck_f[:, None]
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    mix *= 0.89 / (np.abs(mix).max() + 1e-9)
    sf.write(f"{d}/mix.wav", mix.astype(np.float32), SR)
    sf.write(f"{d}/music_only.wav", ((music * duck_m[:, None] + fx * duck_f[:, None]) * 0.89 / (np.abs(mix).max() + 1e-9)).astype(np.float32), SR)
    return {"total": total, "sig_start": sig_start, "sig_hit": sig_start + HIT}


if __name__ == "__main__":
    info = build(sys.argv[1])
    json.dump(info, open(f"{sys.argv[1]}/sound_info.json", "w"))
    print(info)
