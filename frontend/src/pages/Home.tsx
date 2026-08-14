import { Link } from 'react-router-dom';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';
import { useAuth } from '../hooks/useAuth';
import '../styles/home.scss';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="home__content" role="main">
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
      </main>
    </div>
  );
}
