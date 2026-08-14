import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/context/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Home from './pages/Home' 
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'
import PrivateRoute from './components/PrivateRoute'
import './styles/main.scss'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div role="status" aria-live="polite" style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Initialiserar...</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Startsida - publik, ingen inloggning behövs */}
      <Route path="/" element={<Home />} />

      {/* Login/Register - publik */}
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />

      {/* Dashboard - SKYDDAD (kräver inloggning) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <div className="dashboard-layout">
              <Navbar />
              <Sidebar />
              <Dashboard />
            </div>
          </PrivateRoute>
        }
      />

      {/* Profile - SKYDDAD */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <div className="dashboard-layout">
              <Navbar />
              <Sidebar />
              <Dashboard /> {/* Placeholder - byt senare */}
            </div>
          </PrivateRoute>
        }
      />

      {/* Posts - SKYDDAD */}
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <div className="dashboard-layout">
              <Navbar />
              <Sidebar />
              <Dashboard /> {/* Placeholder - byt senare */}
            </div>
          </PrivateRoute>
        }
      />

      {/* Stats - SKYDDAD */}
      <Route
        path="/stats"
        element={
          <PrivateRoute>
            <div className="dashboard-layout">
              <Navbar />
              <Sidebar />
              <Dashboard /> {/* Placeholder - byt senare */}
            </div>
          </PrivateRoute>
        }
      />

      {/* 404 - wildcard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
