import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/context/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import UpdatePost from './pages/EditPost'
import Posts from './pages/Posts'
import MyPosts from './pages/MyPosts'
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

  {/* Behövde wrappa i app-layout för att få rätt layout (annars täckte det hela content-area) */}
    <div className="app-layout">
      <Sidebar />

      <main className="app-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/posts/new" element={<CreatePost />} />
          <Route path="/dashboard/posts" element={<MyPosts />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<UpdatePost />} />
          
        </Routes>
      </main>
    </div>
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
