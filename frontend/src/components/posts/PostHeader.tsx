import type { PostDetailsResponse } from "../../api/posts";

interface PostHeaderProps {
  post: PostDetailsResponse;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header>
      <h1>{post.title}</h1>

      <p> Skrivet av <strong>{post.authorId.username}</strong> </p>

      <p> Kategori: <strong>{post.categoryId.name}</strong> </p>

      <p>
        {new Date(post.createdAt).toLocaleDateString("sv-SE")}
      </p>
    </header>
  );
}