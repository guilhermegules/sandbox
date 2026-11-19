# Gulp Setup (Legacy Asset Pipeline & Task Runner)

[Gulp](https://gulpjs.com/) is a streaming task runner for Node.js that defined the era of web build automation prior to modern AST-based module bundlers (Webpack, Vite, Rspack, Turbopack).

---

## 🏛️ Architecture: Task Runner vs. Module Bundler

| Concept | Gulp (Task Runner) | Modern Bundlers (Webpack, Vite, Rspack) |
| :--- | :--- | :--- |
| **Mental Model** | **File Stream Pipeline**: Read file -> pipe through transforms -> write output file. | **Dependency Graph**: Parse entry file -> trace `import`/`require` AST -> bundle graph. |
| **Code Splitting** | Manual (developer manually configures multiple entry streams). | Automatic (calculates shared vendor chunks and dynamic `import()` chunks). |
| **Tree Shaking** | None (unless piped through external bundlers). | Native dead-code elimination across entire module graph. |
| **HMR** | Full page reload via LiveReload/BrowserSync. | Instant Hot Module Replacement without losing browser state. |
| **Execution** | Series and Parallel task pipelines (`gulp.series`, `gulp.parallel`). | Lifecycle compiler hooks and plugins. |

---

## ⚙️ How This Example Works

The [`gulpfile.mjs`](./gulpfile.mjs) demonstrates a complete classical asset pipeline:

1. **`clean`**: Purges the target `dist/` folder.
2. **`html`**: Reads `index.html` via `gulp.src()` and streams it directly to `dist/`.
3. **`styles`**: Ingests `src/App.css`, transforms it via a Node.js `Transform` stream through `clean-css`, and emits `dist/styles.min.css`.
4. **`scripts`**: Bundles the modern React application components into `dist/main.bundle.js`.
5. **`serve`**: Runs a local HTTP server on port `3007` with `gulp.watch()` triggers on source file changes.

---

## 🚀 Quick Start

```bash
# From this folder
npm run build   # Executes gulp.series(clean, gulp.parallel(html, styles, scripts))
npm run dev     # Runs build and starts dev server with file watchers on port 3007

# Or from root
npm run dev:gulp
npm run build:gulp
```
