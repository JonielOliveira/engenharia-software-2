import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserSignup from './pages/UserSignup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<UserSignup />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;
