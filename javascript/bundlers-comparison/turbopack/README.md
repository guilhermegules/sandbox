# Turbopack Setup

[Turbopack](https://turbo.build/pack) is an incremental bundler optimized for JavaScript and TypeScript, written in **Rust** by the creators of Webpack (Tobias Koppers) and Next.js at Vercel.

## Architecture Highlights
- **Incremental Computation**: Built atop the **Turbo engine**, a low-level incremental computation cache. Turbopack never recomputes work it has already done down to the function level.
- **Fast HMR**: Turbopack delivers updates to the browser in milliseconds regardless of the application size by calculating minimal diffs.
- **Next.js Integration**: Turbopack is the default future engine of Next.js, replacing Webpack for both dev server and production builds.
- **Rust Core**: Built with Rust and SWC, utilizing multithreading and low memory consumption.

## Quick Start
```bash
npm install
npm run dev      # Runs Next.js dev server with Turbopack on port 3005
npm run build    # Produces production build
npm run start    # Serves production build
```
