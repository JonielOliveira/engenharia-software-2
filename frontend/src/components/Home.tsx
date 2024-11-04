import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: { percentage: number; amount: number };
  images: string[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="center-align">
        <img 
            src="/assets/icons/logo_name.png" 
            alt="Produtos" 
            style={{ width: '50%', height: 'auto' }} // ajuste o tamanho conforme necessário
        />
      </div>
      <div className="input-field col s12 center-align">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar produtos..."
        />
      </div>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col s12 m6 l4" key={product._id}>
              <div className="card">
                <div className="card-image">
                  {/* <img src={product.images[0]} alt={product.name} /> */}
                  <img 
                    src="/assets/images/product_example.png" 
                    alt={product.name}
                    style={{ width: '80%', height: 'auto' }}
                  />
                  <span className="card-title">{product.name}</span>
                </div>
                <div className="card-content">
                  <p>{product.description}</p>
                  <p>
                    Preço: R$ {product.price.toFixed(2)}{' '}
                    {product.discount.percentage > 0 && (
                      <span className="red-text">
                        (Desconto: {product.discount.percentage}%)
                      </span>
                    )}
                  </p>
                </div>
                <div className="card-action">
                  <Link to={`/products/${product._id}`} className="btn">Ver Detalhes</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="center-align">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
