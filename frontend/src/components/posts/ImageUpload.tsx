interface ImageUploadProps {
  image: File | null;
  altText: string;
  onImageChange: (file: File | null) => void;
  onAltTextChange: (value: string) => void;
}

export default function ImageUpload({
  image,
  altText,
  onImageChange,
  onAltTextChange,
}: ImageUploadProps) {
  return (
    <fieldset className="post-form__fieldset">
      <legend>Bild</legend>

      <div className="post-form__field">
        <label htmlFor="image">Välj bild</label>

        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="post-form__file-input"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            onImageChange(file);
          }}
        />
      </div>

      <div className="post-form__field">
        <label htmlFor="altText">Alternativ text</label>

        <input
          id="altText"
          type="text"
          value={altText}
          onChange={(event) => onAltTextChange(event.target.value)}
          placeholder="Beskriv din bild"
        />
      </div>

      {image && (
        <p className="post-form__file-name">
          Vald bild: <strong>{image.name}</strong>
        </p>
      )}
    </fieldset>
  );
}
