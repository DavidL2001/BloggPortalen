import { useState, useCallback } from "react";
import { updatePost, type UpdatePostData } from "../api/posts";

export function useUpdatePost(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitUpdate = useCallback(
    async (postId: string, postData: UpdatePostData) => {
      if (!token) {
        throw new Error("Du måste vara inloggad");
      }

      setLoading(true);
      setError(null);

      try {
        return await updatePost(token, postId, postData);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Kunde inte uppdatera inlägget";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    submitUpdate,
    loading,
    error,
  };
}