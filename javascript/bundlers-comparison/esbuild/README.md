# esbuild Setup

[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript/TypeScript bundler written in **Go** by Evan Wallace (co-founder of Figma).

## Architecture Highlights
- **Performance**: Written from scratch in Go and compiled directly to native machine code. Avoids V8 JavaScript VM overhead.
- **Parallelism**: Parses, prints, and writes source maps using multi-threaded parallelism across all CPU cores.
- **Simplicity**: Compact CLI and API. Focuses on core bundling speed rather than an exhaustive plugin configuration layer.
- **Ecosystem**: Powers the pre-bundling step of Vite, tsup, and numerous modern CLI tools.

## Quick Start
```bash
npm install
npm run dev      # Starts esbuild context dev server on port 3002
npm run build    # Produces optimized production bundle in dist/
```
