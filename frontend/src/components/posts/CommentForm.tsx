import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  loading?: boolean;
}

export default function CommentForm({
  onSubmit,
  loading = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content.trim()) {
      setError("Kommentaren får inte vara tom");
      return;
    }

    setError(null);

    try {
      await onSubmit(content.trim());
      setContent("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunde inte skapa kommentaren",
      );
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-form__field">
        <label htmlFor="new-comment">Skriv en kommentar</label>

        <textarea
          id="new-comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Skickar..." : "Kommentera"}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}
