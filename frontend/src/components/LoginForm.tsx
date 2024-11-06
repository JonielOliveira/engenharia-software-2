import React, { useState } from 'react';
import api from '../services/api';
import NavbarOrange from './NavbarOrange';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      alert('Login realizado com sucesso!');
      // Redirecionar ou armazenar o token, caso o login seja bem-sucedido
      console.log('Token:', response.data.token);
    } catch (error) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <NavbarOrange title="Login" />
        <div className="collection borda branca">
          
          {/* Email */}
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          
          {/* Senha */}
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="validate"
              required
            />
            <label htmlFor="password">Senha</label>
          </div>

          {/* Mensagem de erro */}
          {error && <p className="red-text center-align">{error}</p>}

          {/* Botão de Submit */}
          <div className="col s12 center-align">
            <button type="submit" className="btn teal" onClick={handleSubmit}>
              Entrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
