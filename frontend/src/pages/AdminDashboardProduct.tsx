// import React from 'react';
// // import InventoryManager from '../components/InventoryManager';
// import AdminProductLists from '../components/AdminProductLists';
// // import OutOfStockReport from '../components/OutOfStockReport';

// const AdminDashboardProduct: React.FC = () => (
//   <div>
//     <h1>Dashboard do Administrador</h1>
//     <AdminProductLists />
//     {/* <OutOfStockReport /> */}
//   </div>
// );

// export default AdminDashboardProduct;



import React from 'react';
import AdminProductLists from '../components/AdminProductLists';
import Sidebar from '../components/Sidebar';

const AdminDashboardProduct: React.FC = () => {
  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col s3">
        <Sidebar />
      </div>

      {/* Conteúdo Principal */}
      <div className="col s9">
        <h1>Dashboard do Administrador</h1>
        <AdminProductLists />
      </div>
    </div>
  );
};

export default AdminDashboardProduct;
