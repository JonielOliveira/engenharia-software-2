import React from 'react';
import AdminApprovalPanel from '../components/AdminApprovalPanel';
import InventoryManager from '../components/InventoryManager';
// import OutOfStockReport from '../components/OutOfStockReport';

const AdminDashboard: React.FC = () => (
  <div>
    <h1>Dashboard do Administrador</h1>
    <AdminApprovalPanel />
    <InventoryManager />
    {/* <OutOfStockReport /> */}
  </div>
);

export default AdminDashboard;
