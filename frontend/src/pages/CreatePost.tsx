import { useNavigate } from "react-router-dom";
import PostForm from "../components/posts/PostForm";

export default function CreatePost() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Skapa inlägg</h1>

      <PostForm
        onSuccess={(postId) => navigate(`/posts/${postId}`)}
        onCancel={() => navigate("/dashboard")}
      />
    </main>
  );
}