import { useNavigate, useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";
import PostForm from "../components/posts/PostForm";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      </div>
    );
  }

  if (!post) {
    return (
      <div role="alert">
        <h1>Inlägget hittades inte</h1>
      </div>
    );
  }

  return (
    <main>
      <h1>Redigera inlägg</h1>

      <PostForm
        postId={post._id}
        initialValues={{
          title: post.title,
          content: post.content,
          categoryId: post.categoryId._id,
          altText: post.altText,
        }}
        onSuccess={(postId) => navigate(`/posts/${postId}`)}
        onCancel={() => navigate(`/posts/${post._id}`)}
      />
    </main>
  );
}