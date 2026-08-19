import type { PostDetailsResponse } from "../../api/posts";

interface PostHeaderProps {
  post: PostDetailsResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="post-details__header">
      <h1 className="post-details__title">{post.title}</h1>

      <div className="post-details__meta">
        <span className="post-details__author">
          Skrivet av <strong>{post.authorId.username}</strong>
        </span>
        <span className="post-details__category">
          Kategori: <strong>{post.categoryId.name}</strong>
        </span>
        <span className="post-details__date">
          {new Date(post.createdAt).toLocaleDateString("sv-SE")}
        </span>
      </div>
    </header>
  );
}
