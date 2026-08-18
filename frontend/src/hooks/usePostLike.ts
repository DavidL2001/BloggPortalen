import { useCallback, useEffect, useState } from "react";
import { getPostLikes, likePost, unlikePost } from "../api/likes";

export function usePostLike(token: string | null, postId: string) {
  const [count, setCount] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLikes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPostLikes(postId, token);

      setCount(data.count);
      setLikedByUser(data.likedByUser);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunde inte hämta gilla-markeringar",
      );
    } finally {
      setLoading(false);
    }
  }, [postId, token]);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  const toggleLike = async () => {
    if (!token) {
      throw new Error("Du måste vara inloggad för att gilla ett inlägg");
    }

    setError(null);

    try {
      if (likedByUser) {
        await unlikePost(token, postId);
        setLikedByUser(false);
        setCount((previous) => previous - 1);
      } else {
        await likePost(token, postId);
        setLikedByUser(true);
        setCount((previous) => previous + 1);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunde inte ändra gilla-markeringen",
      );
    }
  };

  return {
    count,
    likedByUser,
    loading,
    error,
    toggleLike,
  };
}
