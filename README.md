# The Softly Rising — automated astrology Shorts engine

See `BRIEF.md` for every channel/content/style decision.

## Pipeline (one video)
1. `videos/<id>/script.json` — narration segments (+ hook lines, key words, per-item title/glyph/sub)
2. `python3 sound/build_voice.py videos/<id>` → `voice.wav` + `timeline.json`
3. `python3 sound/design.py videos/<id>` → `mix.wav` (synthesized score, risers, bells, signature sting)
4. `node engine/render_video.js "engine/scene_vector.html?scenes=<scenes>.js" videos/<id> out/<id>.mp4`
5. `node engine/cover.js "<same scene url>" videos/<id> <t> out/covers/<id>_cover.png '["LINE","~small line","LINE"]'`

## Layout
- `engine/` — renderer (Chromium/Playwright → ffmpeg), vector characters, scene libraries per video type
- `sound/` — procedural sound design (`synth.py`, `signature.py`, `design.py`), TTS (`tts_local.py` temp)
- `brand/` — brand experiments, `assets/` — channel PP & art
- `setup.sh` — installs deps and downloads the temporary TTS model
