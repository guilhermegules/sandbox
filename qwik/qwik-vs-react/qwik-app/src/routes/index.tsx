import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);

  return (
    <section>
      <h1>Qwik App</h1>
      <p>
        Server-rendered app built with <strong>Qwik 1.20 (Qwik City)</strong>.
        Qwik is <strong>resumable</strong>: zero JavaScript is shipped or
        executed on load. The counter is interactive immediately because its
        state and event handler were serialized in the HTML — the handler code
        is downloaded only when you click.
      </p>

      <div class="card">
        <h2>Counter (useSignal)</h2>
        <p class="count">{count.value}</p>
        <div class="row">
          <button onClick$={() => count.value--}>-1</button>
          <button onClick$={() => count.value++}>+1</button>
        </div>
      </div>

      <p>
        Compare with the equivalent React page: the same UI, but React ships a
        ~260&nbsp;kB JS bundle that must be downloaded and executed (hydrated)
        before the page is interactive.
      </p>
    </section>
  );
});