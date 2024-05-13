import React from "react";
import { MessageField, Post } from "./components";
import "./style.css";
import { PostResponse } from "./types/Post";
import { useCreatePost, useListPosts } from "./services/PostService";

export default function Root() {
  const { data, isLoading } = useListPosts();
  const { trigger } = useCreatePost();
  const [message, setMessage] = React.useState("");
  const [posts, setPosts] = React.useState<PostResponse[]>([]);

  const onSubmitMessage = (message: string) => {
    const payload = {
      body: message,
      id: Math.random() * 10000,
      title: "",
      userId: Math.random() * 10000,
    };

    trigger(payload);
    setPosts((prevPosts) => [payload, ...prevPosts]);
  };

  React.useEffect(() => {
    if (!data) return;
    setPosts(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="py-8 px-16 relative h-[100vh]">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="py-4 flex">
        <MessageField
          message={message}
          onChangeMessage={setMessage}
          onSubmitMessage={onSubmitMessage}
        />
      </div>
      <div className="grid grid-cols-1 w-full py-4 gap-4">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}
