import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { isAuthenticated, role, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/signup'); // Redireciona para a página de login
  };

  return (
    <div onClick={handleLogout}>
        Sair
    </div>
  );
};

export default LogoutButton;
