import React, { createContext, useContext, useState, useEffect } from 'react';

// Defina a interface para o AuthContext
interface AuthContextProps {
  role: string | null;
  setRole: (role: string | null) => void;
}

// Crie o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Tente obter o papel do usuário a partir do token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
    } else {
        setRole(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
