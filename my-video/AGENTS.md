# Project instructions

Work in this existing checkout; Codex Cloud tasks are already isolated. Do not create a Git worktree unless requested.

Read `.agents/skills/remotion-best-practices/SKILL.md` and the relevant official Remotion skills before editing video code. Use frame-based animation and local `public/` assets. Keep footage and render outputs out of commits.

Run commands from `my-video`: `npm ci`, `npm run assets`, `npm run lint`, `npm run build`. In Cloud set `npm_config_cache=/workspace/.npm-cache`, `NODE_USE_ENV_PROXY=1`, and `REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium`. Verify video changes with `npm run still` and `npm run render`; inspect outputs. Studio starts with `npm run dev -- --port=3000`, but Cloud onboarding does not expose an interactive preview. See README.md for local preview and output retrieval.
