import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../features/worldWise/authSlice";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!isAuthenticated) <Navigate to="login" replace />;
  if (isAuthenticated) <Outlet />;
}

export default ProtectedRoute;
