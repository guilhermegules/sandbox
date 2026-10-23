# Webpack 5 Setup

[Webpack](https://webpack.js.org/) is the battle-tested, standard module bundler for JavaScript applications that defined modern web application compilation.

## Architecture Highlights
- **Universal Graph**: Constructs a dependency graph encompassing JavaScript, CSS, HTML, images, and fonts via loaders.
- **Ecosystem & Maturity**: Thousands of loaders and plugins supporting every conceivable build requirement (Module Federation, microfrontends, custom AST transforms).
- **Architecture**: Written in JavaScript and runs on Node.js. Single-threaded by default, relying on plugins like `thread-loader` or persistent cache for optimization.
- **Customizability**: Unrivaled flexibility and granular control over every aspect of compilation, chunking, and caching.

## Quick Start
```bash
npm install
npm run dev      # Starts Webpack dev server on port 3006
npm run build    # Produces optimized production build in dist/
```
