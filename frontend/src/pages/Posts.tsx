import { useEffect, useState } from "react";
import type { Category } from "../api/categories";
import { getCategories } from "../api/categories";
import PostFilters from "../components/posts/PostFilters";
import PostList from "../components/posts/PostList";
import { usePosts } from "../hooks/usePosts";

export default function Posts() {
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

  return (
    <main>
      <h1>Alla inlägg</h1>

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
          <p>Laddar inlägg...</p>
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