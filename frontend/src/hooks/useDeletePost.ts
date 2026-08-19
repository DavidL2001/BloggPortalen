import { useState, useCallback } from "react";
import { deletePost } from "../api/posts";

export function useDeletePost(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDelete = useCallback(
    async (postId: string) => {
      if (!token) {
        throw new Error("Du måste vara inloggad");
      }

      setLoading(true);
      setError(null);

      try {
        await deletePost(token, postId);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Kunde inte ta bort inlägget";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    submitDelete,
    loading,
    error,
  };
}