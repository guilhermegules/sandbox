import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="app">
      <nav class="nav">
        <Link href="/">Home</Link>
        <Link href="/todos">Todos</Link>
        <Link href="/posts">Posts</Link>
      </nav>

      <main class="main">
        <Slot />
      </main>
    </div>
  );
});