import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    // alert('Você saiu da sua conta');
    navigate('/signup'); // Redireciona para a página de login
  };

  return (
    <div onClick={handleLogout}>
        Sair
    </div>
  );
};

export default LogoutButton;
