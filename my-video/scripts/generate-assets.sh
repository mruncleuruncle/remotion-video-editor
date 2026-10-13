#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/media
# Synthetic footage and quiet music tone; no downloads or copyrighted media.
ffmpeg -hide_banner -loglevel error -y -f lavfi -i 'testsrc2=size=540x960:rate=30' -t 3 -an -c:v libx264 -pix_fmt yuv420p public/media/placeholder.mp4
ffmpeg -hide_banner -loglevel error -y -f lavfi -i 'sine=frequency=220:sample_rate=48000' -t 5.5 -af 'volume=0.08,afade=t=in:d=0.3,afade=t=out:st=5:d=0.5' public/media/sample.wav
