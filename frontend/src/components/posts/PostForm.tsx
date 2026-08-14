import { useEffect, useState } from "react";
import type { Category } from "../../api/categories";
import { getCategories } from "../../api/categories";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import { useAuth } from "../../hooks/useAuth";
import CategorySelect from "./CategorySelect";
import ImageUpload from "./ImageUpload";
import FormActions from "./FormActions";

interface PostFormProps {
  onSuccess: (postId: string) => void;
  onCancel: () => void;

  initialValues?: {
    title: string;
    content: string;
    categoryId: string;
    altText: string;
  };

  postId?: string;
}

export default function PostForm({
  onSuccess,
  onCancel,
  initialValues,
  postId,
}: PostFormProps) {
  const { token } = useAuth();

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId ?? ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [altText, setAltText] = useState(initialValues?.altText ?? "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const { submitPost, loading, error } = useCreatePost(token);

  const {
    submitUpdate,
    loading: updateLoading,
    error: updateError,
  } = useUpdatePost(token);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setCategoryError(
          err instanceof Error
            ? err.message
            : "Kunde inte hämta kategorier"
        );
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      if (postId) {
        const updatedPost = await submitUpdate(postId, {
          title,
          content,
          categoryId,
          image: image ?? undefined,
          altText,
        });

        onSuccess(updatedPost._id);
      } else {
        const createdPost = await submitPost({
          title,
          content,
          categoryId,
          image: image ?? undefined,
          altText,
        });

        onSuccess(createdPost._id);
      }
    } catch {
      // hooks hanterar felmeddelanden
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titel</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Innehåll</label>

        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={10}
          required
        />
      </div>

      {categoryError && (
        <p role="alert">{categoryError}</p>
      )}

      <CategorySelect
        categories={categories}
        value={categoryId}
        onChange={setCategoryId}
      />

      <ImageUpload
        image={image}
        altText={altText}
        onImageChange={setImage}
        onAltTextChange={setAltText}
      />

      {(error || updateError) && (
        <p role="alert">
          {error || updateError}
        </p>
      )}

      <FormActions
        loading={loading || updateLoading}
        onCancel={onCancel}
      />
    </form>
  );
}