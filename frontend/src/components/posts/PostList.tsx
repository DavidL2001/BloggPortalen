import type { PostListItem } from "../../api/posts";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostListItem[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p> Det finns inga inlägg att visa. </p>
    );
  }

  return (
    <section aria-label="Alla inlägg">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </section>
  );
}