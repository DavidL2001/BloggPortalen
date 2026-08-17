import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useSidebar } from '../../contexts/SidebarContext'
import { useAuth } from '../../hooks/useAuth'
import styles from './navbar.module.css'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const { isOpen, toggleSidebar } = useSidebar()
    const { logout, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const isHome = location.pathname === '/'

    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={toggleSidebar}
                    aria-expanded={isOpen}
                    aria-controls="main-sidebar"
                    aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
                >
                    ☰
                </button>
                <Link to="/" className={styles.logo}>
                    BloggPortalen
                </Link>
            </div>
            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className={styles.themeButton}
                >
                    {theme === 'light' ? '🌙 Mörkt' : '☀️ Ljust'}
                </button>

                {isAuthenticated ? (
                    <>
                        {isHome ? (
                            <Link
                                to="/dashboard"
                                className={styles.dashboardButton}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/" className={styles.dashboardButton}>
                                Hem
                            </Link>
                        )}
                        <span className={styles.greeting}>
                            Hej, {user?.username}
                        </span>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
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
    )
}
