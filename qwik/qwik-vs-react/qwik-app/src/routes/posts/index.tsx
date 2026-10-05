import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

type Post = { id: number; title: string; body: string };

export const usePosts = routeLoader$(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Post[];
});

export default component$(() => {
  const posts = usePosts();

  return (
    <section>
      <h1>Posts</h1>
      <p>
        Data is fetched <strong>on the server</strong> by a routeLoader$, during
        SSR or prerendering, and the resulting HTML is streamed to the browser.
        No client-side fetch and no loading state — the content is already in
        the markup when the page arrives.
      </p>

      <ul class="posts">
        {posts.value.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
});