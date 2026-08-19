import { useCallback, useEffect, useState } from "react";
import {
  getPosts,
  type PostListItem,
  type PostsPagination,
} from "../api/posts";

interface UsePostsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  author?: string;
}

export function usePosts({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  sort = "",
  author = "",
}: UsePostsOptions = {}) {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [pagination, setPagination] = useState<PostsPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPosts(
        page,
        limit,
        search,
        category,
        sort,
        author
      );

      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunde inte hämta inläggen"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, category, sort, author]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    pagination,
    loading,
    error,
    reload: loadPosts,
  };
}