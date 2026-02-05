import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
