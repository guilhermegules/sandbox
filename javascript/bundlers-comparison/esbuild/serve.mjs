import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const outdir = 'dist';

async function serve() {
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir, { recursive: true });
  }
  fs.copyFileSync('index.html', path.join(outdir, 'index.html'));

  const ctx = await esbuild.context({
    entryPoints: ['src/main.jsx'],
    bundle: true,
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
      'process.env.NODE_ENV': '"development"',
    },
  });

  const { host, port } = await ctx.serve({
    servedir: outdir,
    port: 3002,
  });

  console.log(`[esbuild] Dev server running at http://${host || 'localhost'}:${port}`);
}

serve().catch((err) => {
  console.error(err);
  process.exit(1);
});
