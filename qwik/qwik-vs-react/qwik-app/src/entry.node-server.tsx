import { getRequestEvent } from '@builder.io/qwik-city';
import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import { createServer } from 'node:http';

const PORT = process.env.PORT ?? 3004;

const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  static: {
    cacheControl: 'public, max-age=31536000, immutable',
  },
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  const requestEv = getRequestEvent();
  if (requestEv) {
    console.error('Unhandled exception during request', {
      origin,
      method: requestEv.method,
      url: requestEv.url.href,
      headersSent: requestEv.headersSent,
      error,
    });
    return;
  }

  console.error('Unhandled exception outside request', { origin, error });
});

const server = createServer();

server.on('request', (req, res) => {
  staticFile(req, res, () => {
    router(req, res, () => {
      notFound(req, res, () => {});
    });
  });
});

server.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});