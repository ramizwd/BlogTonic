import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const PrivateRoute = () => {
  return () => {
    const { token } = useContext(AuthContext);

    if (!token) {
      return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
  };
};
