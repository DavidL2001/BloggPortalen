import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import styles from './navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        BloggPortalen
      </Link>

      <div className={styles.actions}>
        <button type="button" onClick={toggleTheme} className={styles.themeButton}>
          {theme === 'light' ? '🌙 Mörkt' : '☀️ Ljust'}
        </button>

        {isAuthenticated ? (
          <>
            {isHome ? (
             <Link to="/dashboard" className={styles.dashboardButton}>
            Dashboard
            </Link>
                ) : (
                <Link to="/" className={styles.dashboardButton}>
                   Hem
            </Link>
            )}
            <span className={styles.greeting}>Hej, {user?.username}</span>
            <button type="button" onClick={handleLogout} className={styles.logoutButton}>
              Logga ut
            </button>
          </>
        ) : (
          <Link to="/auth" className={styles.loginButton}>
            Logga in
          </Link>
        )}
      </div>
    </header>
  );
}
