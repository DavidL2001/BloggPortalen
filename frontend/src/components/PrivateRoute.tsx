import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import Auth from '../pages/Auth';

interface PrivateRouteProps {

  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <>{children}</>;
}
