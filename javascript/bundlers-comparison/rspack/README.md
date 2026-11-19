# Rspack Setup

[Rspack](https://rspack.dev/) is a high-performance JavaScript bundler written in **Rust** by ByteDance.

## Architecture Highlights
- **Webpack Interoperability**: Designed as a drop-in or near drop-in replacement for Webpack with high compatibility for Webpack's plugin and loader architecture.
- **Built-in SWC**: Built-in SWC transformer for compiling JSX, TS, and modern ECMAScript directly in Rust without Node.js bridge overhead.
- **Speed**: 5x to 10x faster builds and dev startup compared to standard Webpack.
- **Enterprise Scale**: Built to handle massive monorepos and enterprise Webpack configurations without rewriting codebase architectures.

## Quick Start
```bash
npm install
npm run dev      # Starts Rspack dev server on port 3003
npm run build    # Produces optimized production build in dist/
```
