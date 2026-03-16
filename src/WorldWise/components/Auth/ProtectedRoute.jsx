// ProtectedRoute – The Gatekeeper: This component guards any routes you wrap it around. Its logic is simple but depends on our Redux state:

import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsInitialized,
} from "../../../features/worldWise/authSlice";
import { Navigate, Outlet } from "react-router";
import SpinnerFullPage from "../SpinnerFullPage";

function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  // Why isInitialized and not isAuthenticated: If we didn't wait for isInitialized, we might redirect to login even when a session exists but Redux hasn't been updated yet (race condition). The spinner buys us time. After initialization, the decision is based solely on authentication.

  if (!isInitialized) return <SpinnerFullPage />;
  if (isAuthenticated && isInitialized) return <Outlet />;
  if (!isAuthenticated && isInitialized) return <Navigate to="login" replace />;
}

export default ProtectedRoute;
