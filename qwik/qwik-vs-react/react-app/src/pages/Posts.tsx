import { useEffect, useState } from 'react';

type Post = { id: number; title: string; body: string };

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Post[]) => {
        if (!cancelled) setPosts(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p>Failed to load posts: {error}</p>;

  return (
    <section>
      <h1>Posts</h1>
      <p>
        Data is fetched <strong>in the browser</strong> with useEffect + fetch
        after the app has been hydrated. You see a loading state until the
        request completes.
      </p>

      {loading && <p>Loading posts…</p>}

      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}