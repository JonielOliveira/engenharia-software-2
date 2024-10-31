import React from 'react';
// import InventoryManager from '../components/InventoryManager';
import AdminProductLists from '../components/AdminProductLists';
// import OutOfStockReport from '../components/OutOfStockReport';

const AdminDashboardProduct: React.FC = () => (
  <div>
    <h1>Dashboard do Administrador</h1>
    <AdminProductLists />
    {/* <OutOfStockReport /> */}
  </div>
);

export default AdminDashboardProduct;
