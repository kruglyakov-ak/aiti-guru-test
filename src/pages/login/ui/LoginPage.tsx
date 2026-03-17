import { LoginForm } from '@/features/auth/ui/LoginForm';
import { Navigate } from 'react-router';
import { useAppSelector } from '@/shared/store/hooks';
import { selectToken } from '@/features/auth/model/authSlice';

export const LoginPage = () => {
  const token = useAppSelector(selectToken);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
      <LoginForm />
    </div>
  );
};