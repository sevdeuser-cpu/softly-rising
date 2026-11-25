"""Temporary local TTS (Kokoro) until Google Cloud TTS key is available."""
import sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M = "/home/user/softly-rising/models/"
_k = None
def tts(text, voice="af_heart", speed=0.92):
    global _k
    if _k is None: _k = Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")
    if ":" in voice:   # blend, e.g. "af_nicole:0.7,af_heart:0.3"
        parts = [v.split(":") for v in voice.split(",")]
        voice = sum(_k.get_voice_style(n) * float(w) for n, w in parts)
    a, sr = _k.create(text, voice=voice, speed=speed, lang="en-us")
    return np.asarray(a, dtype=np.float32), sr
if __name__ == "__main__":
    a, sr = tts(sys.argv[1], sys.argv[2]); sf.write(sys.argv[3], a, sr); print(len(a)/sr)
