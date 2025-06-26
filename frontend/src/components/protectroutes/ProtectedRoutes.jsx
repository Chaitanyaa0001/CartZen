// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/useAuth';
import Loader from '../loader/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return <Loader />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
