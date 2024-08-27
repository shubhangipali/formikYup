import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import { useSelector } from 'react-redux'; // Import useSelector from redux

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
