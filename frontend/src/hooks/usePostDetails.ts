import { useCallback, useEffect, useState } from "react";
import {
  getPostById,
  type PostDetailsResponse,
} from "../api/posts";

export function usePostDetails(postId: string) {
  const [post, setPost] = useState<PostDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPostById(postId);
      setPost(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunde inte hämta inlägget"
      );
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost,
  };
}