import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/shared/store/hooks";
import { selectToken } from "@/features/auth/model/authSlice";

export const ProtectedRoute = () => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
