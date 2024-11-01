import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import Sidebar from '../components/Sidebar';

const AdminProductEdit: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Produto salvo com sucesso!');
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col s3">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="col s9">
        <h1>Atualização de Produto</h1>
        {successMessage && <p>{successMessage}</p>}
        <ProductForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default AdminProductEdit;
