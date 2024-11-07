import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL do backend
});

// Adiciona o token ao header de autorização se ele estiver presente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
