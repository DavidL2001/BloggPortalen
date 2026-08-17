import { usePostLike } from "../../hooks/usePostLike";
import { useAuth } from "../../hooks/useAuth";

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const { token } = useAuth();

  const { count, likedByUser, loading, error, toggleLike } = usePostLike(
    token,
    postId,
  );

  /* Katrina: Valde att göra ett simpelt hjärta istället för text men behåll aria-label för tillgänglighet. 
    Kan ändras till ikon eller liknande senare. */
  return (
    <div>
      {token ? (
        <button
          type="button"
          onClick={toggleLike}
          disabled={loading}
          aria-label={
            likedByUser ? "Ta bort gilla-markering" : "Gilla inlägget"
          }
          aria-pressed={likedByUser}
        >
          {likedByUser ? "♥" : "♡"}
        </button>
      ) : (
        <span aria-label="Antal gilla-markeringar">♡</span>
      )}

      <span>{count}</span>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
