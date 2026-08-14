import { useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  if (!user) {
    return null;
  }

  //Få initials från användarnamn
  const initials = user.username
    .split(' ')
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join('');

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__logo">
          <div>BP</div>
          <span>BloggPortalen</span>
        </div>

        <nav className="dashboard__nav">
          <button
            className="dashboard__nav-item"
            aria-current="page"
          >
            📊 Dashboard
          </button>
          <button className="dashboard__nav-item">Mina inlägg</button>
          <button className="dashboard__nav-item">Andra bloggar</button>
          <button className="dashboard__nav-item">Inställningar</button>
        </nav>

        <button
          className="dashboard__logout"
          onClick={handleLogout}
          type="button"
          aria-label="Logga ut från ditt konto"
        >
          Logga ut
        </button>
      </header>

      <main className="dashboard__content" role="main">
        <section className="profile">
          <div className="profile__header">
            <div className="profile__avatar" title={user.username}>
              {initials}
            </div>

            <div className="profile__info">
              <h1 className="profile__name">{user.username}</h1>
              <p className="profile__email">{user.email}</p>
              <span className="profile__role">

                {user.role === 'admin' ? 'Administratör' : 'Användare'}
              </span>
            </div>
          </div>

          <div className="profile__details">
            <div className="profile__field">
              <label className="profile__field-label">E-postadress</label>
              <p className="profile__field-value">{user.email}</p>
            </div>

            <div className="profile__field">
              <label className="profile__field-label">Medlemsroll</label>
              <p className="profile__field-value">
                {user.role === 'admin' ? 'Administratör' : 'Vanlig användare'}
              </p>
            </div>

            {user.bio && (
              <div className="profile__field">
                <label className="profile__field-label">Biografi</label>
                <p className="profile__field-value">{user.bio}</p>
              </div>
            )}

            </div>

          <div className="profile__actions">
            <button
              className="dashboard__logout"
              onClick={handleLogout}
              type="button"
              aria-label="Logga ut från ditt konto"
            >
              Logga ut
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
