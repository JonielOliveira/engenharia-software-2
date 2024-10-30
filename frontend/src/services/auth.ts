import api from './api';

export const registerUser = async (data: { email: string; password: string; name?: string; cpf?: string; consentGiven?: boolean }) => {
  return api.post('/auth/register', data);
};

// Adicione outras funções como login, logout etc., conforme necessário.
