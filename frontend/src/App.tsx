import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Home from './pages/Home'
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'
import PrivateRoute from './components/PrivateRoute'

import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import Posts from './pages/Posts'
import MyPosts from './pages/MyPosts'

import './styles/main.scss'

function AppContent() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div
                role="status"
                aria-live="polite"
                style={{ padding: '2rem', textAlign: 'center' }}
            >
                <p>Initialiserar...</p>
            </div>
        )
    }

    return (
        <Routes>
            {/* Startsida - publik */}
            <Route path="/" element={<Home />} />

            {/* Login/Register - publik */}
            <Route
                path="/auth"
                element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />
                }
            />

            {/* Dashboard - skyddad */}
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

            {/* Profil - skyddad */}
            <Route
                path="/profile"
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

            {/* Mina inlägg - skyddad */}
            <Route
                path="/dashboard/posts"
                element={
                    <PrivateRoute>
                        <div className="dashboard-layout">
                            <Navbar />
                            <Sidebar />
                            <MyPosts />
                        </div>
                    </PrivateRoute>
                }
            />

            {/* Skapa inlägg - skyddad */}
            <Route
                path="/dashboard/posts/new"
                element={
                    <PrivateRoute>
                        <div className="dashboard-layout">
                            <Navbar />
                            <Sidebar />
                            <CreatePost />
                        </div>
                    </PrivateRoute>
                }
            />

            {/* Alla inlägg - publik */}
            <Route path="/posts" element={<Posts />} />

            {/* Detaljsida - publik */}
            <Route path="/posts/:id" element={<PostDetails />} />

            {/* Redigera inlägg - skyddad */}
            <Route
                path="/posts/:id/edit"
                element={
                    <PrivateRoute>
                        <div className="dashboard-layout">
                            <Navbar />
                            <Sidebar />
                            <EditPost />
                        </div>
                    </PrivateRoute>
                }
            />

            {/* Statistik - skyddad */}
            <Route
                path="/stats"
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

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

function App() {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </AuthProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default App
