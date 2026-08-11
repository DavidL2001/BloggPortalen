import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div role="main" aria-labelledby="dashboard-title">

      <h1 id="dashboard-title">Dashboard</h1>

      <section aria-labelledby="profile-section">
        <h2 id="profile-section">Din profil</h2>

        <dl>
          <dt>Användarnamn:</dt>
          <dd>{user.username}</dd>

          <dt>E-post:</dt>
          <dd>{user.email}</dd>

          <dt>Roll:</dt>
          <dd>{user.role === 'admin' ? 'Administratör' : 'Användare'}</dd>


          {user.bio && (
            <>
              <dt>Biografi:</dt>
              <dd>{user.bio}</dd>
            </>

          )}
        </dl>
      </section>

      <button
        onClick={logout}
        type="button"
        
        aria-label="Logga ut från ditt konto"
      >
        Logga ut
      </button>
    </div>
  );
}
