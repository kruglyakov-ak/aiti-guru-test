import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/entities/store/hooks";
import { selectToken } from "@/entities/auth/authSlice";

export const ProtectedRoute = () => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
