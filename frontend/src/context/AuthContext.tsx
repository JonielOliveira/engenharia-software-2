import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: () => void;
  logout: () => void;
  setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;  // Definindo o tipo de 'children' como React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Verifica no localStorage se o token existe
    return !!localStorage.getItem('token');
  });

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o token existe no localStorage e decodifica para obter o role
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o token JWT
      setRole(decodedToken.role);  // Define o papel do usuário (role)
    } else {
      setRole(null);
    }
  }, [isAuthenticated]);  // Atualiza o papel sempre que o estado de autenticação mudar

  const login = () => {
    // Simulação de login: salva o token e atualiza a autenticação
    localStorage.setItem('token', 'some-token');  // Salve o token (exemplo)
    setIsAuthenticated(true);

    // Exemplo: Defina o role após o login
    const decodedToken = JSON.parse(atob('some-token'.split('.')[1]));  // Exemplo de decodificação
    setRole(decodedToken.role);
  };

  const logout = () => {
    // Remove o token e atualiza o estado de autenticação
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
