import React, { useEffect, useState } from 'react';
import api from '../services/api';

type User = {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  isApproved: boolean;
};

const AdminApprovalPanel: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await api.get('/auth/users'); // Endpoint para usuários pendentes de aprovação
      setAllUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const response = await api.get('/auth/users/pending'); // Endpoint para usuários pendentes de aprovação
      setPendingUsers(response.data);
    };
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      const response = await api.get('/auth/users/approved'); // Endpoint para usuários aprovados
      setApprovedUsers(response.data); // Supondo que `setApprovedUsers` seja o estado para os aprovados
    };
    fetchApprovedUsers();
  }, []);
  
  const approveUser = async (userId: string) => {
    try {
      const response = await api.patch('/auth/users/approve', { userId });
      alert(response.data.message); // Exibe uma mensagem de sucesso
      // Atualize a lista de usuários pendentes ou aprovados, conforme necessário
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
    }
  };
  
  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`/auth/users/${userId}`);
      alert(response.data.message); // Exibe uma mensagem de sucesso
      // Atualize a lista de usuários pendentes conforme necessário
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
  
  return (
    <div>
      <h2>Clientes - Aguardando Aprovação:</h2>
      <ul>
        {pendingUsers.map(user => (
          <li key={user._id}>
            {user.email} - <button onClick={() => approveUser(user._id)}>Aprovar</button>
            <button onClick={() => deleteUser(user._id)}>Rejeitar</button>
          </li>
        ))}
      </ul>

      <h2>Clientes - Aprovados:</h2>
      <ul>
        {approvedUsers.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.cpf}
          </li>
        ))}
      </ul>

      <h2>Todos os Clientes:</h2>
      <ul>
        {allUsers.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.cpf}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AdminApprovalPanel;
