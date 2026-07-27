import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_PATHS } from "../../routes/routePaths";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={ROUTE_PATHS.MEMBERSHIP_LOGIN} replace />;
  return children;
}
