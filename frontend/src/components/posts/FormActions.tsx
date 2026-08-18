interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export default function FormActions({
  loading,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="post-form__actions">
      <button type="submit" className="post-form__submit-btn" disabled={loading}>
        {loading ? "Publicerar..." : "Publicera"}
      </button>

      <button type="button" className="post-form__cancel-btn" onClick={onCancel}>
        Avbryt
      </button>
    </div>
  );
}
