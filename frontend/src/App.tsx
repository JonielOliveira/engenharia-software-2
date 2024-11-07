import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import AdminDashboardClient from './pages/AdminDashboardClient';
import AdminDashboardProduct from './pages/AdminDashboardProduct';
import AdminProductCreate from './pages/AdminProductCreate';
import AdminProductEdit from './pages/AdminProductEdit';
import UserSignup from './pages/UserSignup';
import ProductForm from './components/ProductForm';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// Possibilita utilizar os icones do materializecss.com
import 'material-design-icons/iconfont/material-icons.css';
import PageHome from './pages/PageHome';
import UserLogin from './pages/UserLogin';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota protegida */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/client" element={<AdminDashboardClient />} />
          <Route path="/admin/products/edit/:productId" element={<AdminProductEdit />} />
          <Route path="/admin/product/create" element={<AdminProductCreate />} />
          <Route path="/admin/product" element={<AdminDashboardProduct />} />
        </Route>
        <Route path="/" element={<PageHome />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default App;
