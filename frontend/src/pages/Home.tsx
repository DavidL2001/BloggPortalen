import { Link } from 'react-router-dom';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';
import PostCard from '../components/posts/PostCard';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import '../styles/home.scss';

export default function Home() {
  const { isAuthenticated } = useAuth();

  //hämtar bara dom 3 senaste inläggen
  const { posts, loading, error } = usePosts ({ limit: 3 });

  return (
    <>
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="home__content dashboard-layout__content"  role="main">

        <section className="home__hero">
          <h1>Välkommen till BloggPortalen</h1>

          <div className="home__cta">
            {isAuthenticated ? (
              <Link to="/posts" className="home__btn home__btn--large">
                Börja blogga nu
              </Link>
            ) : (
              <p className="home__cta-text">
                <Link to="/auth">Logga in på ditt konto</Link>
              </p>
            )}
          </div>
        </section>

        <section className="home__latest" aria-labelledby='latest-heading'>
            <h2 id="latest-heading">Senaste inläggen</h2>

            {loading && <p>laddar inlägg...</p>}
            {error && <p role="alert">{error}</p>}

            {!loading && !error && (
                <div className="home__latest-grid">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post}/>
                    ))}
                </div>
            )}

            <Link to="/posts" className="home__btn">
            Se alla inlägg
            </Link>
        </section>
      </main>
    </div>

    </>
  );
}
