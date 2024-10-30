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
  const [users, setUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get('/auth/pending-users'); // Endpoint para usuários pendentes de aprovação
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      const response = await api.get('/auth/approved-users'); // Endpoint para usuários aprovados
      setApprovedUsers(response.data); // Supondo que `setApprovedUsers` seja o estado para os aprovados
    };
    fetchApprovedUsers();
  }, []);
  
  // const handleApproval = async (userId: string, isApproved: boolean) => {
  //   await api.put(`/auth/approve-user/${userId}`, { isApproved });
  //   setUsers(users.filter(user => user._id !== userId)); // Remove usuário da lista após aprovação/rejeição
  // };

  const approveUser = async (userId: string) => {
    try {
      const response = await api.put('/auth/approve-user', { userId });
      alert(response.data.message); // Exibe uma mensagem de sucesso
      // Atualize a lista de usuários pendentes ou aprovados, conforme necessário
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
    }
  };
  
  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete('/auth/delete-user', { data: { userId } });
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
        {users.map(user => (
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
    </div>
  );
};

export default AdminApprovalPanel;
