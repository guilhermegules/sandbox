# Vite Setup

[Vite](https://vitejs.dev/) is a frontend tooling framework created by Evan You.

## Architecture Highlights
- **Development**: Serves source code over native ESM, using **esbuild** (written in Go) for pre-bundling dependencies 10-100x faster than traditional JS bundlers.
- **Production**: Uses **Rollup** for highly-optimized, tree-shaken static production bundles. (Transitioning towards **Rolldown**, a Rust-based Rollup-compatible bundler).
- **HMR**: Extremely fast module-level Hot Module Replacement that stays fast regardless of application size.

## Quick Start
```bash
npm install
npm run dev      # Starts Vite dev server on port 3001
npm run build    # Produces optimized production build in dist/
npm run preview  # Previews production dist/ locally
```
