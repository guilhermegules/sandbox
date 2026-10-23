import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const outdir = 'dist';

async function build() {
  if (fs.existsSync(outdir)) {
    fs.rmSync(outdir, { recursive: true, force: true });
  }
  fs.mkdirSync(outdir, { recursive: true });

  const start = performance.now();
  await esbuild.build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: outdir,
    format: 'esm',
    splitting: true,
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.css': 'css',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  });

  // Copy HTML template to dist
  fs.copyFileSync('index.html', path.join(outdir, 'index.html'));

  const elapsed = (performance.now() - start).toFixed(2);
  console.log(`[esbuild] Production build completed in ${elapsed}ms -> ${outdir}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
