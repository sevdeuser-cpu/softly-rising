"""Softly Rising signature sound: a pad that opens like dawn, stardust, and a
rising three-note bell motif that lands as the moon clears the horizon."""
import sys
import numpy as np
from synth import (SR, note, pad_voice, fm_bell, sparkle_cloud, air_swell, sub_bloom,
                   lowpass_sweep, env_adsr, reverb, place, master, write_wav)

HIT = 1.70  # seconds: moon fully risen / bell lands (animation syncs to this)


def signature(total=3.4, hit=HIT):
    n = int(total * SR)
    mix = np.zeros((n, 2))

    # 1) Dawn pad — Dmaj9 voicing, filter opens toward the hit
    pad = np.zeros((n, 2))
    for nm, g in [("D3", 0.9), ("A3", 0.7), ("F#4", 0.55), ("C#5", 0.35), ("E5", 0.3)]:
        pad += pad_voice(note(nm), total) * g
    pad = lowpass_sweep(pad, 350, 4200)
    e = env_adsr(n, hit * 0.9, 0.6, 0.55, total - hit - 0.4, curve=2.2)
    mix += pad * e[:, None] * 0.22

    # 2) Air swell rising into the hit
    mix = place(mix, air_swell(hit + 0.3, 250, 7000, amp=0.05), 0.0)

    # 3) Stardust, denser toward the hit, then a short sparkle shower
    mix += sparkle_cloud(total, start=0.25, density=10, seed=4) * 0.8
    mix = place(mix, sparkle_cloud(1.4, start=0.0, density=26, fmin=3000, fmax=7000, seed=8) * 0.6, hit)

    # 4) Rising bell motif: D5 - F#5 - A5, landing on A5 + D6
    for at, nm, amp, pan in [(hit - 0.42, "D5", 0.22, -0.35), (hit - 0.21, "F#5", 0.26, 0.3)]:
        mix = place(mix, fm_bell(note(nm), 2.2, index=1.6, decay=1.6, pan=pan) * amp, at)
    mix = place(mix, fm_bell(note("A5"), total - hit, index=2.2, decay=2.6, pan=-0.1) * 0.42, hit)
    mix = place(mix, fm_bell(note("D6"), total - hit, ratio=2.0, index=1.2, decay=2.2, pan=0.15) * 0.2, hit + 0.012)

    # 5) Warm low bloom under the landing
    mix = place(mix, sub_bloom(note("D2"), total - hit + 0.1, amp=0.28), hit - 0.1)

    mix = reverb(mix, wet=0.38, dur=3.4)[:n + int(0.0 * SR)]
    return master(mix[:n], peak_db=-1.5, fade_out=0.6)


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "signature.wav"
    total = float(sys.argv[2]) if len(sys.argv) > 2 else 3.4
    write_wav(out, signature(total))
    print("wrote", out)
