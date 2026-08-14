import { Link } from "react-router-dom";
import type { PostListItem } from "../../api/posts";

interface PostCardProps {
  post: PostListItem;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `http://localhost:5000${post.featuredImage}`
    : null;

  return (
    <article>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.altText}
        />
      )}

      <div>
        <h2>{post.title}</h2>

        <p>
          Skrivet av <strong>{post.authorId.username}</strong>
        </p>

        <p>
          Kategori: <strong>{post.categoryId.name}</strong>
        </p>

        <p>
          {new Date(post.createdAt).toLocaleDateString("sv-SE")}
        </p>

        <Link to={`/posts/${post._id}`}>
          Läs inlägget
        </Link>
      </div>
    </article>
  );
}