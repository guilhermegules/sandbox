import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import http from 'http';
import CleanCSS from 'clean-css';
import * as esbuild from 'esbuild';
import { Transform } from 'stream';

const DIST_DIR = 'dist';

// 1. Clean Task: Empties target dist directory
export function clean(done) {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });
  done();
}

// 2. HTML Task: Copies HTML template to dist
export function html() {
  return gulp
    .src('index.html')
    .pipe(gulp.dest(DIST_DIR));
}

// 3. Styles Task: Streaming pipeline reading CSS, minifying via CleanCSS, outputting to dist
export function styles() {
  const minifyStream = new Transform({
    objectMode: true,
    transform(file, enc, cb) {
      if (file.isNull()) return cb(null, file);
      if (file.isBuffer()) {
        const output = new CleanCSS({ level: 2 }).minify(file.contents.toString());
        file.contents = Buffer.from(output.styles);
        file.basename = 'styles.min.css';
      }
      cb(null, file);
    },
  });

  return gulp
    .src('src/App.css')
    .pipe(minifyStream)
    .pipe(gulp.dest(DIST_DIR));
}

// 4. Scripts Task: Bundles React application into single self-contained bundle for browser
export async function scripts() {
  await esbuild.build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: path.join(DIST_DIR, 'main.bundle.js'),
    format: 'esm',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
    },
  });
}

// 5. Watch & Serve Task: Development server with watch
export function serve(done) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(DIST_DIR, reqPath.split('?')[0]);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.map': 'application/json',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  const PORT = 3007;
  server.listen(PORT, () => {
    console.log(`[Gulp] Dev server running at http://localhost:${PORT}`);
  });

  // Gulp file watching
  gulp.watch(['src/**/*.css'], styles);
  gulp.watch(['src/**/*.jsx', 'src/**/*.js'], scripts);
  gulp.watch(['index.html'], html);

  done();
}

// Composite Gulp Pipelines
export const build = gulp.series(clean, gulp.parallel(html, styles, scripts));
export const dev = gulp.series(build, serve);

export default build;
