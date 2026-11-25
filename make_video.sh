#!/usr/bin/env bash
# usage: ./make_video.sh <video_id> <scenes_file.js> <cover_time_seconds> '<cover lines json>'
# expects videos/<id>/script.json and engine/<scenes_file.js>
set -e
cd "$(dirname "$0")"
ID=$1; SCN=$2; CT=$3; CL=$4
[ -s models/kokoro-v1.0.onnx ] || ./setup.sh
python3 sound/build_voice.py videos/$ID
python3 sound/design.py videos/$ID
mkdir -p out/covers
node engine/render_video.js "engine/scene_vector.html?scenes=$SCN" videos/$ID out/$ID.mp4
COVER_TOP=${COVER_TOP:-1490} node engine/cover.js "engine/scene_vector.html?scenes=$SCN" videos/$ID $CT out/covers/${ID}_cover.png "$CL"
echo "OK out/$ID.mp4 out/covers/${ID}_cover.png"
