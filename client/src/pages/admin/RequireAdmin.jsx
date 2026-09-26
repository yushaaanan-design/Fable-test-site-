import { Navigate } from 'react-router-dom';

// Mock gate only — real admin auth (bcrypt + httpOnly session cookie) comes later, see backend-architecture.md
export default function RequireAdmin({ children }) {
  const isAdmin = Boolean(sessionStorage.getItem('fable_admin_session'));
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}
