#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bundlers Comparison Matrix & Dashboard</title>
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --text: #f0f6fc;
      --text-muted: #8b949e;
      --accent: #58a6ff;
      --green: #238636;
      --yellow: #d29922;
      --purple: #8957e5;
    }
    body {
      margin: 0;
      padding: 2rem;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
    }
    h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2.2rem;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .table-container {
      overflow-x: auto;
      background: var(--card-bg);
      border-radius: 10px;
      border: 1px solid var(--border);
      margin-bottom: 2.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.95rem;
    }
    th, td {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border);
    }
    th {
      background: #21262d;
      font-weight: 700;
      color: #c9d1d9;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .tool-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.5rem;
      position: relative;
    }
    .tool-card h3 {
      margin-top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tag {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: #30363d;
      color: #c9d1d9;
    }
    .pros { color: #3fb950; font-weight: 600; }
    .cons { color: #f85149; font-weight: 600; }
    ul { padding-left: 1.2rem; margin: 0.5rem 0; }
    li { margin-bottom: 0.3rem; font-size: 0.9rem; color: #c9d1d9; }
    pre {
      background: #0d1117;
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid var(--border);
      font-size: 0.85rem;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>JavaScript Bundlers Architectural Matrix</h1>
      <p style="color: var(--text-muted); margin: 0;">Vite &bull; esbuild &bull; Rspack &bull; Rsbuild &bull; Turbopack &bull; Webpack &bull; Gulp (Legacy)</p>
    </header>

    <h2>Comprehensive Feature Comparison Matrix</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Bundler</th>
            <th>Core Language</th>
            <th>Dev Server Model</th>
            <th>Production Engine</th>
            <th>Config Complexity</th>
            <th>Plugin Ecosystem</th>
            <th>Webpack Compatible?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vite</strong></td>
            <td>TypeScript / Go</td>
            <td>Native ESM (On-demand)</td>
            <td>Rollup (Rolldown coming)</td>
            <td>Low (Zero-config presets)</td>
            <td>Rollup & Vite Plugins</td>
            <td>No (Plugin adapters exist)</td>
          </tr>
          <tr>
            <td><strong>esbuild</strong></td>
            <td>Go (Native compiled)</td>
            <td>Full bundle / Context serve</td>
            <td>esbuild native</td>
            <td>Minimal (CLI / JS API)</td>
            <td>Low (Simple Go/JS hooks)</td>
            <td>No</td>
          </tr>
          <tr>
            <td><strong>Rspack</strong></td>
            <td>Rust + C++</td>
            <td>Incremental Bundle (Rust)</td>
            <td>Rspack native (Rust)</td>
            <td>Moderate (Webpack schema)</td>
            <td>High (Webpack compatible)</td>
            <td><strong>Yes (90%+ drop-in)</strong></td>
          </tr>
          <tr>
            <td><strong>Rsbuild</strong></td>
            <td>Rust + TypeScript</td>
            <td>Rspack Dev Server</td>
            <td>Rspack native (Rust)</td>
            <td>Low (Zero-config modern)</td>
            <td>High (Rspack + Webpack)</td>
            <td><strong>Yes (via Rspack)</strong></td>
          </tr>
          <tr>
            <td><strong>Turbopack</strong></td>
            <td>Rust (SWC based)</td>
            <td>Turbo Incremental Cache</td>
            <td>Turbopack (Rust)</td>
            <td>Low (Built into Next.js)</td>
            <td>Growing (Next.js focused)</td>
            <td>Webpack loader subset</td>
          </tr>
          <tr>
            <td><strong>Webpack 5</strong></td>
            <td>JavaScript (Node.js)</td>
            <td>Full Graph in Memory</td>
            <td>Webpack 5</td>
            <td>High (Extensive schema)</td>
            <td>Massive (Industry standard)</td>
            <td><strong>Original</strong></td>
          </tr>
          <tr>
            <td><strong>Gulp (Legacy)</strong></td>
            <td>JavaScript (Streams)</td>
            <td>Manual file watcher</td>
            <td>Task-based pipelines</td>
            <td>Moderate (Code-as-config)</td>
            <td>Plugins for vinyl streams</td>
            <td>No (Pre-dates bundler graph)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Architectural Profiles & Trade-Offs</h2>
    <div class="cards-grid">
      <div class="tool-card">
        <h3>Vite <span class="tag">Standard Dev Choice</span></h3>
        <p><strong>Primary Use Case:</strong> Modern SPAs (React, Vue, Svelte), lightning dev server.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Fastest cold server start (native ESM does not bundle code before serving).</li>
          <li>Superb ecosystem with first-class framework plugins.</li>
          <li>Seamless DX with instant HMR and rich error overlays.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>Dev/Prod discrepancy (esbuild in dev vs Rollup in prod).</li>
          <li>Massive module waterfalls in browsers with thousands of unbundled ESM files.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>esbuild <span class="tag">Speed Pioneer</span></h3>
        <p><strong>Primary Use Case:</strong> Bundling libraries, node scripts, backend tools, or internal compiler step.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Raw single/multi-thread speed in compiled Go (10x-100x faster than Webpack).</li>
          <li>Very lightweight binary with zero Node dependencies.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>No HMR built-in out of the box.</li>
          <li>Limited AST transformation capabilities compared to Babel/SWC.</li>
          <li>No code-splitting for non-ESM formats.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>Rspack <span class="tag">Webpack Successor</span></h3>
        <p><strong>Primary Use Case:</strong> Large enterprise codebases & monorepos needing Webpack plugin compatibility at Rust speed.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Drop-in Webpack replacement (understands webpack configs, plugins, and loaders).</li>
          <li>5x-10x faster build and HMR times than Webpack.</li>
          <li>Native SWC compilation without JS-bridge bottlenecks.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>More complex API compared to Rsbuild or Vite.</li>
          <li>Node.js plugins still incur FFI/IPC bridge serialization overhead.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>Rsbuild <span class="tag">Modern Vite Rival</span></h3>
        <p><strong>Primary Use Case:</strong> Modern frontend apps wanting the speed of Rspack without Webpack configuration fatigue.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Consistent engine (Rspack in both development AND production).</li>
          <li>Out-of-the-box TypeScript, CSS Modules, Tailwind, image optimization.</li>
          <li>Extensible via the entire Rspack and Webpack ecosystem.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>Younger community compared to Vite.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>Turbopack <span class="tag">Next.js Engine</span></h3>
        <p><strong>Primary Use Case:</strong> Fullstack React applications powered by Next.js.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Incremental function-level cache architecture (Turbo engine).</li>
          <li>First-class integration with Server Components (RSC) and Next.js App Router.</li>
          <li>Engineered by the original author of Webpack.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>Currently tightly coupled with Next.js (standalone CLI not yet GA).</li>
          <li>Ecosystem compatibility still catching up to legacy Webpack setups.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>Webpack 5 <span class="tag">Battle-Tested Titan</span></h3>
        <p><strong>Primary Use Case:</strong> Legacy enterprise systems, custom complex compilation pipelines, Module Federation.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Unrivaled maturity, plugin availability, and customization depth.</li>
          <li>Native Module Federation support for microfrontends.</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>Slowest cold builds and HMR among modern alternatives.</li>
          <li>High memory consumption and complex configuration boilerplate.</li>
        </ul>
      </div>

      <div class="tool-card">
        <h3>Gulp <span class="tag">Legacy Streaming Runner</span></h3>
        <p><strong>Primary Use Case:</strong> Classical pre-bundler asset pipelines, static site generation, legacy codebases.</p>
        <p class="pros">Strengths:</p>
        <ul>
          <li>Code-over-configuration: explicit, predictable Node.js streaming pipe API.</li>
          <li>Great for non-SPA tasks (image optimization, copying files, sequential migration scripts).</li>
        </ul>
        <p class="cons">Weaknesses:</p>
        <ul>
          <li>No native understanding of ES module dependency graphs (no built-in tree shaking).</li>
          <li>Manual file concatenation and script ordering required.</li>
          <li>No native Hot Module Replacement (requires full browser reload).</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'dashboard.html'), htmlContent, 'utf-8');
console.log(`✓ Generated interactive visual comparison dashboard at ./dashboard.html`);
