# ClipForge Reels

AI-assisted short-form video studio. React/Vite frontend and Node/Express processing API for converting videos you own or are authorized to use into vertical clips.

## Features
- Responsive dark four-tab studio: Home, Clip Studio, Queue, Library.
- Local MP4/MOV/WebM/MKV uploads with progress.
- URL recognition for YouTube/Vimeo/direct links. URL downloading is intentionally not included; upload an authorized local copy.
- FFmpeg 9:16/1:1/16:9 H.264 rendering, optional script captions, 30/60 FPS.
- In-memory render queue and export library.
- Optional Gemini script generation via GEMINI_API_KEY.

## Run
Requirements: Node 20+, FFmpeg and FFprobe on PATH.

    npm install
    npm run install:server
    cp server/.env.example server/.env
    npm run dev

Frontend: http://localhost:5173; API: http://localhost:8787.

Production: npm run build && npm start. Configure persistent UPLOAD_DIR and OUTPUT_DIR. The starter queue is in-memory; use Redis/BullMQ and object storage before scaling.

## API
GET /api/health; POST /api/upload (multipart field video); POST /api/jobs; GET /api/jobs; GET /api/jobs/:id; GET /api/library; POST /api/scripts/generate; GET /api/exports/:filename.

Production checklist: add authentication, per-user quotas, rate limits, malware scanning, durable jobs/storage, licensed transcription for word timestamps, a configured TTS provider, and authorized social integrations. Only process media you own or have permission to use.
