import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();
  if (adminOnly && !isAdmin) return <Navigate to="/login" replace />;
  if (!adminOnly && !user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
