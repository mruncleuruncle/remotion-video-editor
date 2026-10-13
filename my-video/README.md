# Vertical Remotion project

Use Node.js 22+ (Cloud currently has 24.19.0), npm, and FFmpeg. The npm lockfile pins dependencies. Official agent skills are committed under `.agents/skills` (12 skills); `skills-lock.json` records their sources. Refresh deliberately with `npx remotion skills add` and review the diff.

## Install and preview

```bash
cd my-video
# Cloud: use the writable npm cache and platform proxy, with TLS verification intact.
export npm_config_cache=/workspace/.npm-cache
export NODE_USE_ENV_PROXY=1
npm ci
npm run assets
npm run dev -- --port=3000
```

For a local checkout, the Cloud cache/proxy exports are unnecessary. Open Studio at the address printed by the command in your local browser. Select `VerticalSample`.

Codex Cloud onboarding has no supported interactive browser preview or public localhost link. A running Studio process in Cloud does not make its UI accessible from your computer, and live processes do not survive environment snapshots. Use local Studio for scrubbing and interactive editing; Cloud can run lint, builds, stills, and MP4 renders. No port forwarding is configured by this project.

## Render and verify

Cloud has system Chromium. Set its path to avoid an otherwise blocked browser download:

```bash
export REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium
npm run lint
npm run build
npm run still
npm run render
```

On another machine, omit that export so Remotion downloads its supported browser, or set it to your own compatible executable. Browser downloads require access to `www.remotion.dev` and `remotion.media`; both are included in the Cloud configuration draft. Cloud renders use concurrency 2 to limit memory pressure.

The sample is 1080×1920, 30 fps, 165 frames (5.5 seconds), with H.264 video and audio in `out/vertical-sample.mp4`. `out/preview.png` is frame 30. Both are ignored by Git. Retrieve outputs through the Cloud task's file/artifact download controls where available, or ask Codex to attach the MP4 as a downloadable artifact. A filesystem path is not a public download URL. For local use, open the MP4 directly in a video player. Publication snapshots the environment; it does not publish the MP4 or expose Studio.

## Edit footage, animations, audio, captions, and transitions

`src/Composition.tsx` registers `VerticalSample` and keeps its two scene nodes explicit. The opening uses `Video` from `@remotion/media`; the second scene is generated from React markup and frame-based animation. `TransitionSeries` overlaps the two 90-frame scenes for a 15-frame fade, giving 165 total frames. Audio plays across both scenes.

`npm run assets` regenerates a 3-second synthetic placeholder MP4 and a quiet 5.5-second tone using FFmpeg. These are demonstration media, not real footage or narration. Replace the files in `public/media/`, or change `videoPath` and `audioPath` in composition default props (paths are relative to `public/`). Match footage length to scene timing. `staticFile()` resolves media in both Studio and renders. Use `trimBefore`, `volume`, and `playbackRate` on media for further editing; align caption timing when trimming clips.

Captions use JSON-compatible `Caption` objects from `@remotion/captions`, with millisecond start/end times relative to each scene. Edit the inline arrays or import caption JSON. They are manual sample captions; automatic transcription requires a separate model/service setup and is not included. Frame animations use `useCurrentFrame()` and `interpolate()`; avoid CSS animation timers. Use `@remotion/transitions` for fades, wipes, and slides.

Do not commit large media. `public/media/*`, `node_modules`, bundles, and render outputs are ignored. Store production assets outside Git or use a deliberate Git LFS workflow. Commit code, lockfiles, skills, and small metadata.
