import { useCallback, useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
  type CommentResponse,
} from "../api/comments";

export function useComments(postId: string, token: string | null) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPostComments(postId);
      setComments(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunde inte hämta kommentarerna",
      );
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const addComment = async (content: string) => {
    if (!token) {
      throw new Error("Du måste vara inloggad för att lämna en kommentar");
    }

    const newComment = await createComment(token, postId, { content });

    setComments((previous) => [newComment, ...previous]);
  };

  const editComment = async (commentId: string, content: string) => {
    if (!token) {
      throw new Error("Du måste vara inloggad för att redigera din kommentar");
    }

    const updatedComment = await updateComment(token, commentId, content);

    setComments((previous) =>
      previous.map((comment) =>
        comment._id === commentId ? updatedComment : comment,
      ),
    );
  };

  const removeComment = async (commentId: string) => {
    if (!token) {
      throw new Error("Du måste vara inloggad för att ta bort din kommentar");
    }

    await deleteComment(token, commentId);

    setComments((previous) =>
      previous.filter((comment) => comment._id !== commentId),
    );
  };

  return {
    comments,
    loading,
    error,
    addComment,
    editComment,
    removeComment,
    reload: loadComments,
  };
}
