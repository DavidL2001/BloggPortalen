import { useState } from "react";
import type { CommentResponse } from "../../api/comments";

interface CommentListProps {
  comments: CommentResponse[];
  currentUserId?: string;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

export default function CommentList({
  comments,
  currentUserId,
  onEdit,
  onDelete,
}: CommentListProps) {
  if (comments.length === 0) {
    return <p>Det finns inga kommentarer ännu.</p>;
  }

  return (
    <section aria-label="Kommentarer">
      <h2>Kommentarer</h2>

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          isOwner={comment.userId._id === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

interface CommentItemProps {
  comment: CommentResponse;
  isOwner: boolean;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

function CommentItem({ comment, isOwner, onEdit, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!content.trim()) {
      setError("Kommentaren får inte vara tom");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onEdit(comment._id, content.trim());
      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunde inte uppdatera kommentaren",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort kommentaren?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onDelete(comment._id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunde inte ta bort kommentaren",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="comment">
      <p>
        <strong>{comment.userId.username}</strong>
      </p>

      {isEditing ? (
        <>
          <label htmlFor={`comment-${comment._id}`}>Redigera kommentar</label>

          <textarea
            id={`comment-${comment._id}`}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            disabled={loading}
          />

          <button type="button" onClick={handleEdit} disabled={loading}>
            {loading ? "Sparar..." : "Spara"}
          </button>

          <button
            type="button"
            onClick={() => {
              setContent(comment.content);
              setIsEditing(false);
              setError(null);
            }}
            disabled={loading}
          >
            Avbryt
          </button>
        </>
      ) : (
        <p>{comment.content}</p>
      )}

      <p>{new Date(comment.createdAt).toLocaleDateString("sv-SE")}</p>

      {isOwner && !isEditing && (
        <>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            Redigera
          </button>

          <button type="button" onClick={handleDelete} disabled={loading}>
            {loading ? "Tar bort..." : "Ta bort"}
          </button>
        </>
      )}

      {error && <p role="alert">{error}</p>}
    </article>
  );
}
