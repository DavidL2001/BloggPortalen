import { useNavigate } from "react-router-dom";
import PostForm from "../components/posts/PostForm";
import "../styles/_posts.scss";

export default function CreatePost() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">


      <main className="dashboard-layout__content post-page" role="main">
        <h1 className="post-page__title">Skapa inlägg</h1>

        <PostForm
          onSuccess={(postId) => navigate(`/posts/${postId}`)}
          onCancel={() => navigate("/dashboard")}
        />
      </main>
    </div>
  );
}
