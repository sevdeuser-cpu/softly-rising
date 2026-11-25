"""Script -> per-segment TTS -> voice.wav + timeline.json (segment & word timings)."""
import json, sys, re, numpy as np, soundfile as sf
sys.path.insert(0, "/home/user/softly-rising/sound")
from tts_local import tts
from scipy.signal import resample_poly
SR = 48000
d = sys.argv[1]
S = json.load(open(f"{d}/script.json"))
LEAD, GAP, TAIL = 0.12, 0.22, 3.4          # tight pacing: short gaps between lines
pieces, t, tl = [np.zeros(int(LEAD * SR))], LEAD, []
for seg in S["segments"]:
    a, sr = tts(seg["text"], S["voice"], S["speed"])
    a = resample_poly(a, SR, sr).astype(np.float32)
    # trim leading/trailing near-silence
    idx = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, idx[0] - 400): idx[-1] + 2400]
    dur = len(a) / SR
    # word timings ~ proportional to letters (+ pause weight for punctuation)
    words = seg["text"].split()
    w = np.array([len(re.sub(r"[^\w']", "", x)) + 2 + (3 if re.search(r"[.,?!]$", x) else 0) for x in words], float)
    starts = t + np.concatenate([[0], np.cumsum(w)[:-1]]) / w.sum() * dur
    tl.append({**seg, "start": round(t, 3), "end": round(t + dur, 3),
               "words": [{"w": x, "t": round(float(s), 3)} for x, s in zip(words, starts)]})
    pieces += [a, np.zeros(int(GAP * SR))]; t += dur + GAP
pieces.append(np.zeros(int(TAIL * SR)))
voice = np.concatenate(pieces)
sf.write(f"{d}/voice.wav", voice, SR)
json.dump({"duration": round(len(voice) / SR, 3), "segments": tl, **{k: S[k] for k in ("hook", "keys") if k in S}}, open(f"{d}/timeline.json", "w"), indent=1)
print("duration", round(len(voice) / SR, 2))
for s in tl: print(f'{s["id"]:8s} {s["start"]:6.2f} -> {s["end"]:6.2f}')
