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
    <div>
      <LikeButton postId={postId} />

      <button type="button" onClick={() => navigate("/posts")}>
        Tillbaka till inlägg
      </button>

      {isOwner && (
        <>
          <button
            type="button"
            onClick={() => navigate(`/posts/${postId}/edit`)}
          >
            Redigera
          </button>

          <button type="button" onClick={handleDelete} disabled={loading}>
            {loading ? "Tar bort..." : "Ta bort"}
          </button>
        </>
      )}

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
