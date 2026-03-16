import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { ProductsPage } from '@/pages/products/ui/ProductsPage'; 
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <ProductsPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;