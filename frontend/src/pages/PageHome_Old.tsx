import React, { useState } from 'react';
import AdminApprovalPanel from '../components/AdminApprovalPanel';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Sidebar2 from '../components/Sidebar2';

const PageHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <Sidebar2 onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <Home />
      </div>
    </div>
  );
};

export default PageHome;
