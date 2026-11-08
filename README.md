# ClipForge Reels

AI-assisted short-form video studio. Existing Home, Clip Studio, Queue and Library views are retained.

## New integrations
- Gemini script generation.
- Gemini text-to-speech with selectable prebuilt voices and downloadable WAV narration; narration can be included in final MP4.
- Face-aware reframing using OpenCV face detection and sampled centre keyframes, with centre-crop fallback.
- YouTube/Vimeo single-video import through yt-dlp. The app requires an explicit rights confirmation; only import media you own or have permission to download/edit, and follow platform terms.

## Requirements
Node.js 20+, FFmpeg/FFprobe, yt-dlp, Python 3 and OpenCV Python package, plus a Gemini API key with access to text and TTS models.

## Setup
```bash
npm install
npm run install:server
python3 -m pip install -r server/requirements.txt
cp server/.env.example server/.env
# Set GEMINI_API_KEY in server/.env
npm run dev
```
Frontend http://localhost:5173; API http://localhost:8787. On Windows set PYTHON_BIN=python if needed.

## Environment
See server/.env.example. Defaults: GEMINI_MODEL=gemini-2.0-flash and GEMINI_TTS_MODEL=gemini-2.5-flash-preview-tts. Check current Google AI availability and billing for your account.

## API
POST /api/upload; POST /api/import/url; POST /api/scripts/generate; POST /api/tts/generate; GET /api/narrations/:id; POST /api/jobs; GET /api/jobs; GET /api/jobs/:id; GET /api/library; GET /api/exports/:filename; GET /api/health.

## Production notes
The job queue and media registries are in-memory and reset on restart. Add authentication, per-user quotas, rate limits, durable jobs/storage, upload scanning, timeouts and media isolation before public deployment. Face centering is a lightweight Haar-cascade baseline, not a state-of-the-art multi-object tracker. Gemini features consume API quota.