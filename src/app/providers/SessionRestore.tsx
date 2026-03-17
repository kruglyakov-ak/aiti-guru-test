import { useEffect } from 'react';
import { useAppDispatch } from '../../shared/store/hooks';
import { setToken } from '@/features/auth/model/authSlice';

export const SessionRestore = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const remember = !!localStorage.getItem('token');
      dispatch(setToken({ token, remember }));
    }
  }, [dispatch]);

  return <>{children}</>;
};