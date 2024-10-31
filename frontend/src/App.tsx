import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import AdminDashboardClient from './pages/AdminDashboardClient';
import AdminDashboardProduct from './pages/AdminDashboardProduct';
import AdminProductCreate from './pages/AdminProductCreate';
import AdminProductEdit from './pages/AdminProductEdit';
import UserSignup from './pages/UserSignup';
import ProductForm from './components/ProductForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/client" element={<AdminDashboardClient />} />
        <Route path="/admin/products/edit/:productId" element={<AdminProductEdit />} />
        <Route path="/admin/product/create" element={<AdminProductCreate />} />
        <Route path="/admin/product" element={<AdminDashboardProduct />} />
        <Route path="/signup" element={<UserSignup />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;
