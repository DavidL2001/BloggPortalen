import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFontSize } from '../context/FontSizeContext';
import { useAuth } from '../../hooks/useAuth';
import styles from './navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { increaseFontSize, decreaseFontSize, resetFontSize, scale } = useFontSize();
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Mäter Navbarens verkliga höjd (den kan variera om den wrappar till
  // flera rader, t.ex. vid större textstorlek) och sparar värdet i en
  // CSS-variabel som hamburgermenyn och sidopanelen positionerar sig efter.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${el.offsetHeight}px`
      );
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <header ref={navRef} className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        BloggPortalen
      </Link>

      <div className={styles.actions}>
        <div className={styles.fontControls} role="group" aria-label="Textstorlek">
          <button
            type="button"
            onClick={decreaseFontSize}
            className={styles.fontButton}
            aria-label="Minska textstorlek"
          >
            A-
          </button>
          <button
            type="button"
            onClick={resetFontSize}
            className={styles.fontButton}
            aria-label="Återställ textstorlek"
            title={`${scale}%`}
          >
            A
          </button>
          <button
            type="button"
            onClick={increaseFontSize}
            className={styles.fontButton}
            aria-label="Öka textstorlek"
          >
            A+
          </button>
        </div>

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
