import React from 'react';
import AdminApprovalPanel from '../components/AdminApprovalPanel';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';

const PageHome: React.FC = () => {
  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col s3">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="col s9">
        <Home />
      </div>
    </div>
  );
};

export default PageHome;
