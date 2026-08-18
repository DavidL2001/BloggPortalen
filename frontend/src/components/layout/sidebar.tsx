import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'
import styles from './sidebar.module.css'

const dashboardItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profil info", to: "/profile" },
  { label: "Mina Inlägg", to: "/dashboard/posts" },
  { label: "Skapa Inlägg", to: "/dashboard/posts/new" },
  { label: "Statistik", to: "/stats" },
];

const homeItems = [
    { label: 'Hem', to: '/' },
    { label: 'Inlägg', to: '/posts' },
    { label: 'Om oss & Kontakt', to: '/about' }
]

export default function Sidebar() {
    const { isOpen, toggleSidebar, closeSidebar } = useSidebar()
    const location = useLocation()
    const mobileBarRef = useRef<HTMLDivElement>(null)

    // Välj vilka items som ska visas baserat på route
    const publicRoutes = ['/', '/about', '/posts']
    const isPublicPage =
        publicRoutes.includes(location.pathname) ||
        /^\/posts\/[^/]+$/.test(location.pathname)
    const navItems = isPublicPage ? homeItems : dashboardItems

    useEffect(() => {
        const el = mobileBarRef.current
        if (!el) return

        const updateHeight = () => {
            document.documentElement.style.setProperty(
                '--mobile-toolbar-height',
                `${el.offsetHeight}px`
            )
        }

        updateHeight()

        const observer = new ResizeObserver(updateHeight)
        observer.observe(el)

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <div ref={mobileBarRef} className={styles.mobileBar}>
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

            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

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
                                end
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
