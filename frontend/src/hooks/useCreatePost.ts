import { useState, useCallback } from "react";
import { createPost, type CreatePostData } from "../api/posts";

export function useCreatePost(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPost = useCallback(
    async (postData: CreatePostData) => {
      if (!token) {
        throw new Error("Du måste vara inloggad");
      }

      setLoading(true);
      setError(null);

      try {
        return await createPost(token, postData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Kunde inte skapa inlägget";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    submitPost,
    loading,
    error,
  };
}