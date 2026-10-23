#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const BUNDLERS = [
  {
    name: 'Vite',
    dir: 'vite',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'Go (dev) / Rollup (prod)',
    category: 'ESM Dev Server + Rollup',
  },
  {
    name: 'esbuild',
    dir: 'esbuild',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'Go',
    category: 'Low-Level Compiler',
  },
  {
    name: 'Rspack',
    dir: 'rspack',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'Rust',
    category: 'Webpack-Compatible Rust Core',
  },
  {
    name: 'Rsbuild',
    dir: 'rsbuild',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'Rust + TS',
    category: 'Zero-Config Rspack Tooling',
  },
  {
    name: 'Turbopack',
    dir: 'turbopack',
    buildCommand: 'npm run build',
    distDir: '.next',
    language: 'Rust (SWC)',
    category: 'Incremental Build Engine (Next.js)',
  },
  {
    name: 'Webpack 5',
    dir: 'webpack',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'JavaScript (Node.js)',
    category: 'Universal Standard Bundler',
  },
  {
    name: 'Gulp (Legacy)',
    dir: 'gulp',
    buildCommand: 'npm run build',
    distDir: 'dist',
    language: 'JavaScript (Streams)',
    category: 'Streaming Task Runner',
  },
];

function getDirectoryStats(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return { totalBytes: 0, gzipBytes: 0, fileCount: 0 };
  }

  let totalBytes = 0;
  let gzipBytes = 0;
  let fileCount = 0;

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        // Skip server cache directories if any
        if (entry.name !== 'cache') {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const stats = fs.statSync(fullPath);
        totalBytes += stats.size;
        fileCount++;
        try {
          const content = fs.readFileSync(fullPath);
          gzipBytes += zlib.gzipSync(content).length;
        } catch {
          // ignore binary reading errors
        }
      }
    }
  }

  walk(dirPath);
  return { totalBytes, gzipBytes, fileCount };
}

function formatKb(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

function cleanDist(bundlerDir, distDir) {
  const fullDist = path.join(rootDir, bundlerDir, distDir);
  if (fs.existsSync(fullDist)) {
    fs.rmSync(fullDist, { recursive: true, force: true });
  }
}

async function runBenchmark() {
  console.log('\n============================================================');
  console.log('       JavaScript Bundlers Performance Benchmark Suite       ');
  console.log('  Vite | esbuild | Rspack | Rsbuild | Turbopack | Webpack   ');
  console.log('============================================================\n');

  const results = [];

  for (const b of BUNDLERS) {
    const bundlerPath = path.join(rootDir, b.dir);
    const nodeModulesPath = path.join(bundlerPath, 'node_modules');
    const rootNodeModules = path.join(rootDir, 'node_modules');

    // Check if node_modules exists either in subfolder or root (workspace hoist)
    const isInstalled = fs.existsSync(nodeModulesPath) || fs.existsSync(rootNodeModules);

    console.log(`--> Testing [${b.name}] in ./${b.dir}...`);

    if (!isInstalled) {
      console.log(`    ⚠️  Skipping: node_modules not detected. Run 'npm install' inside ./${b.dir} first.\n`);
      results.push({
        name: b.name,
        category: b.category,
        language: b.language,
        coldBuild: 'N/A (uninstalled)',
        warmBuild: 'N/A',
        totalSize: 'N/A',
        gzipSize: 'N/A',
        fileCount: 'N/A',
        status: 'Uninstalled',
      });
      continue;
    }

    try {
      // 1. Cold Build
      cleanDist(b.dir, b.distDir);
      const coldStart = performance.now();
      execSync(b.buildCommand, { cwd: bundlerPath, stdio: 'pipe' });
      const coldTime = (performance.now() - coldStart).toFixed(0);

      // Measure stats
      const stats = getDirectoryStats(path.join(bundlerPath, b.distDir));

      // 2. Warm Build (second run)
      const warmStart = performance.now();
      execSync(b.buildCommand, { cwd: bundlerPath, stdio: 'pipe' });
      const warmTime = (performance.now() - warmStart).toFixed(0);

      console.log(`    ✓ Cold: ${coldTime}ms | Warm: ${warmTime}ms | Output: ${formatKb(stats.totalBytes)} (${stats.fileCount} files)\n`);

      results.push({
        name: b.name,
        category: b.category,
        language: b.language,
        coldBuild: `${coldTime} ms`,
        warmBuild: `${warmTime} ms`,
        totalSize: formatKb(stats.totalBytes),
        gzipSize: formatKb(stats.gzipBytes),
        fileCount: `${stats.fileCount} files`,
        status: 'Success',
      });
    } catch (err) {
      console.log(`    ✕ Build failed: ${err.message}\n`);
      results.push({
        name: b.name,
        category: b.category,
        language: b.language,
        coldBuild: 'Error',
        warmBuild: 'Error',
        totalSize: 'Error',
        gzipSize: 'Error',
        fileCount: 'Error',
        status: 'Error',
      });
    }
  }

  // Display results table
  console.log('---------------------------------------------------------------------------------------------------------');
  console.log('| Bundler    | Core Language       | Cold Build | Warm Build | Output Size | Gzip Size  | Assets     |');
  console.log('---------------------------------------------------------------------------------------------------------');
  for (const r of results) {
    const pad = (str, len) => str.padEnd(len, ' ');
    console.log(
      `| ${pad(r.name, 10)} | ${pad(r.language, 19)} | ${pad(r.coldBuild, 10)} | ${pad(r.warmBuild, 10)} | ${pad(r.totalSize, 11)} | ${pad(r.gzipSize, 10)} | ${pad(r.fileCount, 10)} |`
    );
  }
  console.log('---------------------------------------------------------------------------------------------------------\n');

  // Save Markdown Report
  const mdReport = generateMarkdownReport(results);
  const reportPath = path.join(rootDir, 'BENCHMARK_RESULTS.md');
  fs.writeFileSync(reportPath, mdReport, 'utf-8');
  console.log(`Saved benchmark report to: ${reportPath}\n`);
}

function generateMarkdownReport(results) {
  const timestamp = new Date().toISOString();
  return `# Bundler Benchmark Results

> Generated on: ${timestamp}
> Node.js: ${process.version} | Platform: ${process.platform} (${process.arch})

## Build Performance Summary

| Bundler | Architecture / Language | Cold Build | Warm Build | Output Size | Gzip Size | File Count | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
${results
  .map(
    (r) =>
      `| **${r.name}** | ${r.language} | \`${r.coldBuild}\` | \`${r.warmBuild}\` | ${r.totalSize} | ${r.gzipSize} | ${r.fileCount} | ${r.status} |`
  )
  .join('\n')}

## Benchmark Methodology
1. **Cold Build**: Clean target output folder (\`dist/\` or \`.next/\`), execute production build command, measure elapsed wall-clock time in milliseconds.
2. **Warm Build**: Re-execute production build immediately afterwards, measuring the impact of cache mechanisms.
3. **Output Size**: Total uncompressed bytes of generated build artifacts.
4. **Gzip Size**: Total gzipped bytes of generated static assets.
`;
}

runBenchmark().catch(console.error);
