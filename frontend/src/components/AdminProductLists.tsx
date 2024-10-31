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

  // Função para buscar produtos: todos, ativos e inativos
  const fetchProducts = async () => {

    const response = await api.get('/admin/products');
    setAllProducts(response.data);

    const activeResponse = await api.get('/admin/products/active');
    setActiveProducts(activeResponse.data);

    const inactiveResponse = await api.get('/admin/products/inactive');
    setInactiveProducts(inactiveResponse.data);
  };

  useEffect(() => {
    fetchProducts(); // Chama a função para buscar produtos ativos e inativos
  }, []);

  const editProduct = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`); // Redireciona para a página de edição
  };

  const activateProduct = async (productId: string) => {
    try {
      const response = await api.patch(`/admin/products/activate/${productId}`);
      // alert(response.data.message);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao ativar o produto:', error);
    }
  };

  const deactivateProduct = async (productId: string) => {
    try {
      const response = await api.patch(`/admin/products/deactivate/${productId}`);
      // alert(response.data.message);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao ativar o produto:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await api.delete(`/admin/products/${productId}`);
      // alert(response.data.message);
      await fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
  
  return (
    <div>
      <h2>Produtos - Ativos:</h2>
      <ul>
        {activeProducts.map(prod => (
          <li key={prod._id}>
            {prod.sku} - {prod.name}
            <button onClick={() => deactivateProduct(prod._id)}>Desativar</button>
            <button onClick={() => deleteProduct(prod._id)}>Deletar</button>
            <button onClick={() => editProduct(prod._id)}>Editar</button>
          </li>
        ))}
      </ul>

      <h2>Produtos - Inativos:</h2>
      <ul>
        {inactiveProducts.map(prod => (
          <li key={prod._id}>
            {prod.sku} - {prod.name}
            <button onClick={() => activateProduct(prod._id)}>Ativar</button>
            <button onClick={() => deleteProduct(prod._id)}>Deletar</button>
            <button onClick={() => editProduct(prod._id)}>Editar</button>
          </li>
        ))}
      </ul>

      <h2>Todos os Produtos:</h2>
      <ul>
        {allProducts.map(prod => (
          <li key={prod._id}>
            {prod.sku} - {prod.name} - {prod.description}- {prod.price} - {prod.quantity}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AdminProductLists;
