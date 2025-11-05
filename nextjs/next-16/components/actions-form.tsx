"use client";

import { useState } from "react";

type ActionsFormProps = {
  action: (formData: FormData) => Promise<string>;
};

export default function ActionsForm({ action }: ActionsFormProps) {
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await action(formData);
    setMessage(res);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Server Actions Example</h1>
      <form onSubmit={onSubmit} className="mt-4">
        <input
          name="name"
          placeholder="Your name"
          className="border px-2 py-1"
        />
        <button
          type="submit"
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          Say Hello
        </button>
      </form>
      {message && <p className="mt-4 text-purple-600">{message}</p>}
    </div>
  );
}
