import React, { useState } from 'react'; // Importando useState
import api from '../services/api';

// Definição das propriedades que o SignupForm vai aceitar
interface SignupFormProps {
  consent: boolean; // Propriedade para o estado de consentimento
  setConsent: React.Dispatch<React.SetStateAction<boolean>>; // Função para atualizar o estado de consentimento
}

const SignupForm: React.FC<SignupFormProps> = ({ consent, setConsent }) => { // Aceitando as propriedades
  const [email, setEmail] = useState(''); // Estado local para email
  const [password, setPassword] = useState(''); // Estado local para senha
  const [passwordValidation, setPasswordValidation] = useState(''); // Estado local para confirmar a senha
  const [name, setName] = useState(''); // Estado local para nome
  const [cpf, setCpf] = useState(''); // Estado local para CPF
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verificando se a senha e a confirmação da senha são iguais
    if (password !== passwordValidation) {
      setError('As senhas não coincidem');
      return; // Interrompe o envio do formulário
    }
    setError(''); // Limpa qualquer erro anterior
    try {
      // Fazendo a requisição para cadastrar o usuário
      await api.post('/auth/users', { email, password, name, cpf, consentGiven: consent });
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirme a Senha" value={passwordValidation} onChange={(e) => setPasswordValidation(e.target.value)} required />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
      <input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <label>
        <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
        Aceito a coleta de dados conforme LGPD
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default SignupForm;
