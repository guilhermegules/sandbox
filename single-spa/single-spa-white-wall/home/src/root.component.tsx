import React from "react";
import { MessageField, Post } from "./components";
import "./style.css";

export default function Root() {
  const [message, setMessage] = React.useState("");
  const [posts, setPosts] = React.useState([
    {
      user: "guilhermegules",
      nickName: "gules",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fuga
      voluptatem consequatur magni mollitia aut. Eos iste sit nisi ad,
      reiciendis obcaecati. Molestiae beatae praesentium suscipit sint?
      Quis, provident. Asperiores!`,
    },
  ]);

  const onSubmitMessage = (message: string) => {
    setPosts([
      ...posts,
      {
        avatar:
          "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        description: message,
        nickName: "Guilherme Gules",
        user: "guilhermegules",
      },
    ]);
  };

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
          <Post post={post} />
        ))}
      </div>
    </section>
  );
}
