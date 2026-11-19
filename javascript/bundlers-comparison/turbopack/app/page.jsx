'use client';

import React, { useState } from 'react';
import { MetricsCard } from './components/MetricsCard';
import { ItemGrid } from './components/ItemGrid';

export default function TurbopackPage() {
  const [count, setCount] = useState(0);
  const [asyncData, setAsyncData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsyncComputation = async () => {
    setLoading(true);
    try {
      const { computeHeavyFibonacci } = await import('./utils/math.js');
      const result = computeHeavyFibonacci(32);
      setAsyncData(result);
    } catch (err) {
      console.error('Failed to load async chunk', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <span className="badge badge-turbopack">Turbopack Powered</span>
        <h1 className="title">JavaScript Bundler Comparison</h1>
        <p className="subtitle">
          Comparing architecture, build performance, developer experience, and runtime output.
        </p>
      </header>

      <section className="grid-metrics">
        <MetricsCard label="Active Bundler" value="Turbopack" />
        <MetricsCard label="Core Engine" value="Turbo Incremental Engine" />
        <MetricsCard label="Implementation" value="Rust (SWC based)" />
        <MetricsCard label="Category" value="Incremental Build Engine (Next.js)" />
      </section>

      <section className="action-card">
        <div>
          <h3>Interactive State & HMR Test</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
            Current Counter Value: <strong style={{ color: '#fff' }}>{count}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" onClick={() => setCount((c) => c + 1)}>
            Increment Counter (+1)
          </button>
          <button className="btn btn-secondary" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </section>

      <section className="action-card">
        <div>
          <h3>Code Splitting / Dynamic Chunk Test</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
            {asyncData
              ? `Computed Fib(${asyncData.n}) = ${asyncData.result} in ${asyncData.duration}ms`
              : 'Dynamic module ./utils/math.js has not been loaded yet.'}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleAsyncComputation} disabled={loading}>
          {loading ? 'Splitting & Loading...' : 'Load Async Chunk'}
        </button>
      </section>

      <ItemGrid count={24} />

      <footer className="footer">
        <p>Bundlers Comparison Suite &bull; Vite &bull; esbuild &bull; Rspack &bull; Rsbuild &bull; Turbopack &bull; Webpack</p>
      </footer>
    </div>
  );
}
