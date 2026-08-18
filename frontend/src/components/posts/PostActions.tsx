import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useAuth } from "../../hooks/useAuth";
import LikeButton from "./LikeButton";

interface PostActionsProps {
  postId: string;
  authorId: string;
}

export default function PostActions({ postId, authorId }: PostActionsProps) {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const { submitDelete, loading, error } = useDeletePost(token);

  const isOwner = user?._id === authorId;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort inlägget?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await submitDelete(postId);
      navigate("/posts");
    } catch {
      // useDeletePost hanterar och visar felet
    }
  };

  return (
    <div className="post-details__actions">
      <button
        type="button"
        className="post-form__cancel-btn"
        onClick={() => navigate("/posts")}
      >
        Tillbaka till inlägg
      </button>

      <LikeButton postId={postId} />

      {isOwner && (
        <>
          <button
            type="button"
            className="post-details__edit-btn"
            onClick={() => navigate(`/posts/${postId}/edit`)}
          >
            Redigera
          </button>

          <button
            type="button"
            className="post-details__delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Tar bort..." : "Ta bort"}
          </button>
        </>
      )}

      {error && (
        <p role="alert" className="post-form__error">
          {error}
        </p>
      )}
    </div>
  );
}
