import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/context/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'
import './App.css'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p>Initialiserar...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Auth />
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Dashboard />
    </>
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
