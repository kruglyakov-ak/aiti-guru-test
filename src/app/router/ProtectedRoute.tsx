import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/store/hooks";
import { selectToken } from "@/features/auth/model/authSlice";

export const ProtectedRoute = () => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
