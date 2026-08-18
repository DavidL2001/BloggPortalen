import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import styles from "./sidebar.module.css";

const dashboardItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profil info", to: "/profile" },
  { label: "Mina Inlägg", to: "/dashboard/posts" },
  { label: "Skapa Inlägg", to: "/dashboard/posts/new" },
  { label: "Statistik", to: "/stats" },
];

const homeItems = [
  { label: "Hem", to: "/" },
  { label: "Inlägg", to: "/posts" },
  { label: "Om oss", to: "/about" },
];

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  // Välj vilka items som ska visas baserat på route
  const publicRoutes = ["/", "/about"];

  const isPublicPage = publicRoutes.includes(location.pathname);
  const navItems = isPublicPage ? homeItems : dashboardItems;

  return (
    <>
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <nav
        id="main-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
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
  );
}
