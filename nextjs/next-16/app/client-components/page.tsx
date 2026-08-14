"use client";

import { useState } from "react";

export default function ClientPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Client Component</h1>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Count: {count}
      </button>
    </div>
  );
}
