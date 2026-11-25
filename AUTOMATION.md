# Daily run — 2 Shorts per day (instructions for the scheduled task)

1. `cd /home/user/softly-rising` (clone `sevdeuser-cpu/softly-rising` there if missing); `git pull`; run `./setup.sh` if `models/` or `node_modules/` is missing.
2. Read `BRIEF.md` (all decisions are final unless the user changed them in chat) and `content/published.json`.
3. Choose **2 topics** from `content/backlog.md`, following the pillar ratio (40/25/20/15) based on what was published
   recently; never repeat a published topic; the two videos must be from **different pillars**.
   Sky-calendar topics: verify dates/signs with `python3 tools/sky_events.py 75` and only cover events still ahead.
4. For each video: create `videos/<NNN_slug>/script.json` (English, gender-neutral "you", hook lines, keys, items with
   title/glyph/sub), whisper voice `af_nicole:0.7,af_heart:0.3`, speed ~1.1; total ≤ 58 s (check build_voice output; trim text if longer).
   Write a NEW scene library `engine/scenes_<slug>.js` (reuse `woman`, `man`, `planet`, `emblem`-style helpers, heart/star;
   each item gets its own acted mini-scene — no copy-paste scenes from earlier videos).
5. `./make_video.sh <id> scenes_<slug>.js <cover_t> '<cover lines>'`; then extract 6–8 stills and LOOK at them
   (overlaps, text over characters, empty frames). Fix and re-render if anything is off.
6. Write `videos/<id>/metadata.md`: title (≤70 chars, emoji at end), description (item list + CTA + "Heal. Glow. Rise." + 5 hashtags),
   tags, pinned comment.
7. Append to `content/published.json`, commit (no mp4/wav), push to `main`.
8. Send to the user with SendUserFile: both mp4s, both covers, both metadata.md. Reply in Turkish, short:
   titles, pillars, durations, and anything that needs their decision.
