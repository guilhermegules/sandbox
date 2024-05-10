import { PostResponse } from "../../types/Post";

type PostProps = {
  post: PostResponse;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-slate-100 rounded p-4">
      <span className="flex items-center gap-4">
        <img
          className="h-16 w-16 rounded-full ring-2 ring-white"
          src={post.avatar}
          alt={`Avatar from ${post.user}`}
        />
        <p className="font-bold">
          {post.nickName}
          <small className="font-light text-slate-400 ml-2">@{post.user}</small>
        </p>
      </span>
      <p className="p-2">{post.description}</p>
    </div>
  );
};
