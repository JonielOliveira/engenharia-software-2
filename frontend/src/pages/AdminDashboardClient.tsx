import React, { useState } from 'react';
import AdminApprovalPanel from '../components/AdminApprovalPanel';
import Sidebar2 from '../components/Sidebar2';
import Navbar from '../components/NavbarOrange';

const AdminDashboardClient: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <Sidebar2 onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        {/* <h1>Dashboard do Administrador</h1> */}
        <AdminApprovalPanel />
      </div>
    </div>  
  );
};

export default AdminDashboardClient;
