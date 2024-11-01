import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

type Product = {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const AdminProductLists: React.FC = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeProducts, setActiveProducts] = useState<Product[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await api.get('/admin/products');
    setAllProducts(response.data);

    const activeResponse = await api.get('/admin/products/active');
    setActiveProducts(activeResponse.data);

    const inactiveResponse = await api.get('/admin/products/inactive');
    setInactiveProducts(inactiveResponse.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const editProduct = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const activateProduct = async (productId: string) => {
    try {
      await api.patch(`/admin/products/activate/${productId}`);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao ativar o produto:', error);
    }
  };

  const deactivateProduct = async (productId: string) => {
    try {
      await api.patch(`/admin/products/deactivate/${productId}`);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao desativar o produto:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.delete(`/admin/products/${productId}`);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="center-align">Produtos</h2>

      <h3>Ativos:</h3>
      <ul className="collection">
        {activeProducts.map(prod => (
          <li className="collection-item" key={prod._id}>
            <div>
              <strong>{prod.sku} - {prod.name}</strong>
              <div className="secondary-content">
                <button className="btn gray" onClick={() => deactivateProduct(prod._id)}>Desativar</button>
                <button className="btn blue" onClick={() => editProduct(prod._id)}>Editar</button>
                <button className="btn deep-orange" onClick={() => deleteProduct(prod._id)}>Deletar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h3>Inativos:</h3>
      <ul className="collection">
        {inactiveProducts.map(prod => (
          <li className="collection-item" key={prod._id}>
            <div>
              <strong>{prod.sku} - {prod.name}</strong>
              <div className="secondary-content">
                <button className="btn green" onClick={() => activateProduct(prod._id)}>Ativar</button>
                <button className="btn blue" onClick={() => editProduct(prod._id)}>Editar</button>
                <button className="btn deep-orange" onClick={() => deleteProduct(prod._id)}>Deletar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h3>Todos os Produtos:</h3>
      <ul className="collection">
        {allProducts.map(prod => (
          <li className="collection-item" key={prod._id}>
            <strong>{prod.sku} - {prod.name}</strong> - {prod.description} - R$ {prod.price.toFixed(2)} - {prod.quantity}
          </li>
        ))}
      </ul>
      <button className="btn teal" onClick={() => navigate('/admin/product/create')}>Novo Produto</button>
    </div>
  );
};

export default AdminProductLists;
