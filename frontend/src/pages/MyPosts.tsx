import { useEffect, useState } from "react";
import type { Category } from "../api/categories";
import { getCategories } from "../api/categories";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import PostFilters from "../components/posts/PostFilters";
import PostList from "../components/posts/PostList";
import "../styles/_posts.scss";

export default function MyPosts() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const { posts, loading, error } = usePosts({
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
          err instanceof Error ? err.message : "Kunde inte hämta kategorier"
        );
      }
    };

    loadCategories();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      

      <main className="dashboard-layout__content post-page" role="main">
        <h1 className="post-page__title">Mina inlägg</h1>

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
          <p role="alert" className="post-form__error">{categoryError}</p>
        )}

        {loading && (
          <div role="status" aria-live="polite" className="post-list__status">
            <p>Laddar dina inlägg...</p>
          </div>
        )}

        {error && (
          <div role="alert" className="post-form__error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && <PostList posts={posts} />}
      </main>
    </div>
  );
}
