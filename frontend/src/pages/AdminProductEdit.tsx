import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';

const AdminProductEdit: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Produto salvo com sucesso!');
  };

  return (
    <div>
      <h1>Atualização de Produto</h1>
      {successMessage && <p>{successMessage}</p>}
      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AdminProductEdit;
