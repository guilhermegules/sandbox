import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');
const requestsCounter = new Counter('http_requests');

export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-vus',
      vus: 50,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export default function () {
  requestsCounter.add(1);

  // Health check
  let res = http.get(`${BASE_URL}/health`);
  check(res, { 'health status 200': (r) => r.status === 200 });
  errorRate.add(res.status >= 400);
  responseTime.add(res.timings.duration);

  // Ready check
  res = http.get(`${BASE_URL}/ready`);
  check(res, { 'ready status 200': (r) => r.status === 200 });
  errorRate.add(res.status >= 400);
  responseTime.add(res.timings.duration);

  // Create URL
  res = http.post(
    `${BASE_URL}/urls`,
    JSON.stringify({
      url: `https://example.com/${Date.now()}`,
      custom_code: `test${Math.random().toString(36).substring(7)}`,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(res, { 'create url status 201 or 200': (r) => r.status === 201 || r.status === 200 });
  errorRate.add(res.status >= 400);
  responseTime.add(res.timings.duration);

  // List URLs
  res = http.get(`${BASE_URL}/urls?page=1&per_page=10`);
  check(res, { 'list urls status 200': (r) => r.status === 200 });
  errorRate.add(res.status >= 400);
  responseTime.add(res.timings.duration);

  // Get metrics (light load)
  if (__ITER % 10 === 0) {
    res = http.get(`${BASE_URL}/metrics`);
    check(res, { 'metrics status 200': (r) => r.status === 200 });
    errorRate.add(res.status >= 400);
    responseTime.add(res.timings.duration);
  }

  sleep(1);
}
