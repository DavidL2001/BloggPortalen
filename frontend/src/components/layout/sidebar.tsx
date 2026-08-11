import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.css'

const navItems = [
    { label: 'Startsida', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Profil', to: '/profile' },
    { label: 'Inlägg', to: '/posts' },
    { label: 'Statistik', to: '/stats' }
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls="main-sidebar"
                aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
            >
                ☰
            </button>

            <nav
                id="main-sidebar"
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                aria-label="huvudnavigation"
            >
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navLink} ${styles.active}`
                                        : styles.navLink
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
