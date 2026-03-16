import { LoginForm } from '@/features/auth/ui/LoginForm';
import { Navigate } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectToken } from '@/features/auth/model/authSlice';

export const LoginPage = () => {
  const token = useAppSelector(selectToken);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
};