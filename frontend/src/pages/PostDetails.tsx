import { Link, useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";
import PostHeader from "../components/posts/PostHeader";
import PostContent from "../components/posts/PostContent";
import PostImage from "../components/posts/PostImage";
import PostActions from "../components/posts/PostActions";
import { useAuth } from "../hooks/useAuth";
import { useComments } from "../hooks/useComments";
import CommentList from "../components/posts/CommentList";
import CommentForm from "../components/posts/CommentForm";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { post, loading, error } = usePostDetails(id ?? "");

  const { user, token } = useAuth();
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    addComment,
    editComment,
    removeComment,
  } = useComments(id ?? "", token);

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
        <PostImage image={post.featuredImage} altText={post.altText} />
      )}

      <PostContent content={post.content} />

      <PostActions postId={post._id} authorId={post.authorId._id} />

      {commentsLoading && (
        <div role="status" aria-live="polite">
          <p>Laddar kommentarer...</p>
        </div>
      )}

      {commentsError && <p role="alert">{commentsError}</p>}

      <CommentList
        comments={comments}
        currentUserId={user?._id}
        onEdit={editComment}
        onDelete={removeComment}
      />

      {token && <CommentForm onSubmit={addComment} />}
    </article>
  );
}
