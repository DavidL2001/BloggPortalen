interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export default function FormActions({
  loading,
  onCancel,
}: FormActionsProps) {
  return (
    <div>
      <button type="submit" disabled={loading}>
        {loading ? "Publicerar..." : "Publicera"}
      </button>

      <button type="button" onClick={onCancel}> Avbryt </button>
    </div>
  );
}