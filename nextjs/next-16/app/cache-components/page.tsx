"use cache"; // new directive in v16 for caching (opt-in)

export default async function CachePage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  const post = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cache Component</h1>
      <p className="mt-2 text-gray-600">{post.title}</p>
    </div>
  );
}
