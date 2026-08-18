import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'
import styles from './sidebar.module.css'

const dashboardItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Profil info', to: '/profile' },
    { label: 'Mina Inlägg', to: '/dashboard/posts' },
    { label: 'Skapa Inlägg', to: '/dashboard/posts/new' },

]

const homeItems = [
    { label: 'Hem', to: '/' },
    { label: 'Inlägg', to: '/posts' },
    { label: 'Om oss', to: '/about' },
    { label: 'Kontakt', to: '/contact' }
]
export default function Sidebar() {
    const { isOpen, toggleSidebar, closeSidebar } = useSidebar()
    const location = useLocation()

    const isHome = location.pathname === '/'
    const navItems = isHome ? homeItems : dashboardItems

    return (
        <>
            <div className={styles.mobileBar}>
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={toggleSidebar}
                    aria-expanded={isOpen}
                    aria-controls="main-sidebar"
                    aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
                >
                    <span className={styles.toggleIcon}>☰</span>
                    <span className={styles.toggleLabel}>
                        {isOpen ? 'Stäng meny' : 'Meny'}
                    </span>
                </button>
            </div>

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
                                onClick={closeSidebar}
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
