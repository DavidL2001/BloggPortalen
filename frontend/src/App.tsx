import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p>Initialiserar...</p>
      </div>
    );
  }

  return (
    <div role="application" aria-label="BloggPortalen">
      {isAuthenticated ? (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
