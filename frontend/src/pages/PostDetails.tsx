import { Link, useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";
import PostHeader from "../components/posts/PostHeader";
import PostContent from "../components/posts/PostContent";
import PostImage from "../components/posts/PostImage";
import PostActions from "../components/posts/PostActions";
import "../styles/_posts.scss";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { post, loading, error } = usePostDetails(id ?? "");

  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-layout__content post-page" role="main">
        {loading && (
          <div role="status" aria-live="polite" className="post-list__status">
            <p>Laddar inlägg...</p>
          </div>
        )}

        {error && (
          <div role="alert" className="post-details__notice">
            <h1>Kunde inte hämta inlägget</h1>
            <p>{error}</p>
            <Link to="/posts" className="post-form__cancel-btn">
              Tillbaka till inlägg
            </Link>
          </div>
        )}

        {!loading && !error && !post && (
          <div role="alert" className="post-details__notice">
            <h1>Inlägget hittades inte</h1>
            <Link to="/posts" className="post-form__cancel-btn">
              Tillbaka till inlägg
            </Link>
          </div>
        )}

        {!loading && !error && post && (
          <article className="post-details">
            <PostHeader post={post} />

            {post.featuredImage && (
              <PostImage image={post.featuredImage} altText={post.altText} />
            )}

            <PostContent content={post.content} />

            <PostActions postId={post._id} authorId={post.authorId._id} />
          </article>
        )}
      </main>
    </div>
  );
}
