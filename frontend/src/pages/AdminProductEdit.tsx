import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import Sidebar2 from '../components/Sidebar2';

const AdminProductEdit: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Produto salvo com sucesso!');
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <Sidebar2 onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        {/* <h1>Atualização de Produto</h1> */}
        {successMessage && <p>{successMessage}</p>}
        <ProductForm onSuccess={handleSuccess} title="Atualização de Produto" />
      </div>
    </div>
  );
};

export default AdminProductEdit;
