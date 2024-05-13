import { PostResponse } from "../../types/Post";

type PostProps = {
  post: PostResponse;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-slate-100 rounded p-4">
      <span className="flex items-center gap-4">
        <p className="font-bold">
          {post.userId}
          <small className="font-light text-slate-400 ml-2">@{post.userId}</small>
        </p>
      </span>
      <p className="p-2">{post.body}</p>
    </div>
  );
};
