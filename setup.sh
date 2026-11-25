#!/usr/bin/env bash
# One-shot setup for a fresh machine: node deps, python deps, local TTS model (temporary until Google TTS).
set -e
cd "$(dirname "$0")"
npm install --no-audit --no-fund
pip install -q scipy soundfile kokoro-onnx numpy
mkdir -p models
for f in kokoro-v1.0.onnx voices-v1.0.bin; do
  [ -s "models/$f" ] || curl -sSL -o "models/$f" "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/$f"
done
echo "setup ok"
