import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './sidebar.module.css'

const dashboardItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Profil info', to: '/profile' },
    { label: 'Skapa Inlägg', to: '/posts' },
    { label: 'Statistik', to: '/stats' }
]

const homeItems = [
    { label: 'Hem', to: '/' },
    { label: 'Inlägg', to: '/posts' },
    { label: 'Om oss', to: '/about' },
    { label: 'Kontakt', to: '/contact' }
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    // Välj vilka items som ska visas baserat på route
    const isHome = location.pathname === '/'
    const navItems = isHome ? homeItems : dashboardItems

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
