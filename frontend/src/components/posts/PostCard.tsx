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
    <article className="post-card">
      <div className="post-card__info">
        <h2 className="post-card__title">{post.title}</h2>

        <p className="post-card__author">
          Skrivet av <strong>{post.authorId.username}</strong>
        </p>

        <p className="post-card__category">
          Kategori: <strong>{post.categoryId.name}</strong>
        </p>

        <p className="post-card__date">
          {new Date(post.createdAt).toLocaleDateString("sv-SE")}
        </p>
      </div>

      {imageUrl && (
        <img
          className="post-card__image"
          src={imageUrl}
          alt={post.altText}
        />
      )}

      <Link
        className="post-card__link"
        to={`/posts/${post._id}`}
      >
        Läs hela inlägget
      </Link>
    </article>
  );
}