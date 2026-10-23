# Rsbuild Setup

[Rsbuild](https://rsbuild.dev/) is an Rspack-powered build tool by ByteDance that serves as a direct, drop-in alternative to Vite and Create React App.

## Architecture Highlights
- **Vite-like Experience, Rspack-powered**: While Vite pairs esbuild (dev) with Rollup (prod), Rsbuild uses Rspack (Rust) for **both** development and production, eliminating dev/prod parity mismatches.
- **Out-of-the-box Best Practices**: Ships with zero-configuration sensible defaults for TypeScript, JSX, CSS Modules, PostCSS, image optimization, and asset handling.
- **Top-Tier Performance**: Benchmarks show cold build speeds matching or beating Vite while maintaining full compatibility with Webpack plugins via Rspack.

## Quick Start
```bash
npm install
npm run dev      # Starts Rsbuild dev server on port 3004
npm run build    # Produces optimized production build in dist/
npm run preview  # Previews production dist/ locally
```
