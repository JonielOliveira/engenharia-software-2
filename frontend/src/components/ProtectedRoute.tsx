import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Redireciona para a página de login se o token não estiver presente
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
