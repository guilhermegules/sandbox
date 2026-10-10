import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1>React App</h1>
      <p>
        Client-side rendered SPA built with <strong>React 19 + Vite</strong>.
        The whole app is shipped as JavaScript and <strong>hydrated</strong> on
        load so that components like the counter become interactive.
      </p>

      <div className="card">
        <h2>Counter (useState)</h2>
        <p className="count">{count}</p>
        <div className="row">
          <button onClick={() => setCount((c) => c - 1)}>-1</button>
          <button onClick={() => setCount((c) => c + 1)}>+1</button>
        </div>
      </div>

      <p>
        Compare with the equivalent Qwik page: the same UI, but Qwik ships no
        JS for it until a user interacts with it.
      </p>
    </section>
  );
}