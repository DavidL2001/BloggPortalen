import { useEffect, useState } from "react";
import type { Category } from "../api/categories";
import { getCategories } from "../api/categories";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import PostFilters from "../components/posts/PostFilters";
import PostList from "../components/posts/PostList";

export default function MyPosts() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const {
    posts,
    loading,
    error,
  } = usePosts({
    author: user?._id,
    search,
    category,
    sort,
  });

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

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>Mina inlägg</h1>

      <PostFilters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      {categoryError && (
        <p role="alert">{categoryError}</p>
      )}

      {loading && (
        <div role="status" aria-live="polite">
          <p>Laddar dina inlägg...</p>
        </div>
      )}

      {error && (
        <div role="alert">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <PostList posts={posts} />
      )}
    </main>
  );
}