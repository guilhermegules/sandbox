# Bundler Benchmark Results

> Generated on: 2026-10-23T00:11:05.786Z
> Node.js: v24.16.0 | Platform: linux (x64)

## Build Performance Summary

| Bundler | Architecture / Language | Cold Build | Warm Build | Output Size | Gzip Size | File Count | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Vite** | Go (dev) / Rollup (prod) | `573 ms` | `540 ms` | 148.6 KB | 48.6 KB | 4 files | Success |
| **esbuild** | Go | `134 ms` | `138 ms` | 502.9 KB | 145.8 KB | 9 files | Success |
| **Rspack** | Rust | `283 ms` | `269 ms` | 553.3 KB | 158.7 KB | 7 files | Success |
| **Rsbuild** | Rust + TS | `271 ms` | `265 ms` | 147.1 KB | 48.3 KB | 6 files | Success |
| **Turbopack** | Rust (SWC) | `6459 ms` | `5399 ms` | 1648.9 KB | 430.9 KB | 73 files | Success |
| **Webpack 5** | JavaScript (Node.js) | `1358 ms` | `1367 ms` | 147.8 KB | 48.3 KB | 5 files | Success |
| **Gulp (Legacy)** | JavaScript (Streams) | `276 ms` | `246 ms` | 505.9 KB | 146.4 KB | 6 files | Success |

## Benchmark Methodology
1. **Cold Build**: Clean target output folder (`dist/` or `.next/`), execute production build command, measure elapsed wall-clock time in milliseconds.
2. **Warm Build**: Re-execute production build immediately afterwards, measuring the impact of cache mechanisms.
3. **Output Size**: Total uncompressed bytes of generated build artifacts.
4. **Gzip Size**: Total gzipped bytes of generated static assets.
