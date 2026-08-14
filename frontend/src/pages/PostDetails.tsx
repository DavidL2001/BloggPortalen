import { Link, useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";
import PostHeader from "../components/posts/PostHeader";
import PostContent from "../components/posts/PostContent";
import PostImage from "../components/posts/PostImage";
import PostActions from "../components/posts/PostActions";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    post,
    loading,
    error,
  } = usePostDetails(id ?? "");

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p>Laddar inlägg...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert">
        <h1>Kunde inte hämta inlägget</h1>
        <p>{error}</p>
        <Link to="/posts">Tillbaka till inlägg</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div role="alert">
        <h1>Inlägget hittades inte</h1>
        <Link to="/posts">Tillbaka till inlägg</Link>
      </div>
    );
  }

  return (
    <article>
      <PostHeader post={post} />

      {post.featuredImage && (
        <PostImage
          image={post.featuredImage}
          altText={post.altText}
        />
      )}

      <PostContent content={post.content} />

      <PostActions postId={post._id}
       authorId={post.authorId._id} />
    </article>
  );
}