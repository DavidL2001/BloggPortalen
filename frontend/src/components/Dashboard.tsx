import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/_dashboard-layout.scss';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  if (!user) {
    return null;
  }

  // Få initials från användarnamn
  const initials = user.username
    .split(' ')
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join('');

  return (
    <main className="dashboard-layout__content" role="main">
      <section className="profile">
        <div className="profile__header">
          <div className="profile__avatar" title={user.username}>
            {initials}
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{user.username}</h1>
          </div>
        </div>

        {isProfilePage && (
          <>
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

              <div className="profile__field">
                <label className="profile__field-label">Konto-ID</label>
                <p className="profile__field-value" style={{ fontSize: '12px' }}>
                  {user._id}
                </p>
              </div>
            </div>

            <div className="profile__actions">
              <button
                type="button"
                className="profile__logout-btn"
                onClick={logout}
              >
                Logga ut
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
