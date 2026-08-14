import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import styles from './navbar.module.css'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                Bloggportalen
            </Link>

            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className={styles.themeButton}
                >
                    {theme === 'light' ? 'Mörkt' : 'Ljust'}
                </button>

                <span className={styles.greeting}>Hej, användare</span>
                <button type="button" className={styles.logoutButton}>
                    Logga ut
                </button>
            </div>
        </header>
    )
}
