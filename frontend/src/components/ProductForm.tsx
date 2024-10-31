import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Definição das propriedades que o ProductForm vai aceitar
interface ProductFormProps {
  productId?: string; // ID do produto, se estiver editando um produto existente
  onSuccess: () => void; // Função a ser chamada após o sucesso da operação
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [discount, setDiscount] = useState({ percentage: 0, amount: 0 });
  const [isActive, setIsActive] = useState(true);


  // Efeito para calcular o valor do desconto baseado no preço e na porcentagem
  useEffect(() => {
    const calculatedAmount = (price * discount.percentage) / 100;
    setDiscount(prev => ({ ...prev, amount: calculatedAmount }));
  }, [price, discount.percentage]); // Recalcula quando o preço ou a porcentagem mudam

  // Edição do produto
  useEffect(() => {

    console.log("O ID é: " + productId);

    if (productId) {
      const fetchProduct = async () => {
        const response = await api.get(`/admin/products/${productId}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setSku(product.sku);
        setQuantity(product.quantity);
        setCategory(product.category);
        setImages(product.images);
        setTags(product.tags);
        setBrand(product.brand);
        setDiscount(product.discount);
        setDiscount({
          percentage: product.discount.percentage,
          amount: product.discount.amount
        });
        setIsActive(product.isActive);
      };
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        sku: "SKU" + (new Date().toISOString().replace(/[-T:.Z]/g, '')),
        quantity,
        category,
        images,
        tags,
        brand,
        discount,
        dateAdded: new Date().toISOString().split('T')[0], // Data atual
        isActive,
      };

      if (productId) {
        // Se productId estiver definido, atualiza o produto
        await api.put(`/admin/products/${productId}`, productData);
      } else {
        // Caso contrário, cria um novo produto
        await api.post('/admin/products', productData);
      }

      alert('Produto salvo com sucesso!');
      onSuccess(); // Chama a função de sucesso
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        SKU
        <input type="text" value={sku} readOnly /> {/* Campo apenas para visualização */}
      </label>
      <br />
      <label>
        Nome do Produto
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Descrição
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <br />
      <label>
        Preço
        <input type="number" value={price.toFixed(2)} onChange={(e) => setPrice(Number(e.target.value))} 
        min={0} max={1000000} step={0.01} required />
      </label>
      <br />
      <label>
        Quantidade
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
        min={0} max={1000000} step={1} required />
      </label>
      <br />
      <label>
        Categoria
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <br />
      <label>
        URLs das Imagens (separadas por vírgula)
        <input type="text" value={images.join(', ')} onChange={(e) => setImages(e.target.value.split(',').map(img => img.trim()))} />
      </label>
      <br />
      <label>
        Tags (separadas por vírgula)
        <input type="text" value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))} />
      </label>
      <br />
      <label>
        Marca
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </label>
      <br />
      <label>
        Desconto (%)
        <input type="number" value={discount.percentage} onChange={(e) => setDiscount({ ...discount, percentage: Number(e.target.value) })} 
        min={0} max={100} step={0.01} required />
      </label>
      <br />
      <label>
        Valor do Desconto
        <input type="number" value={discount.amount.toFixed(2)} readOnly /> {/* Campo apenas para visualização */}
      </label>
      <br />
      <label>
        <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
        Produto Ativo
      </label>
      <br />
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
      <button type="submit">Salvar Produto</button>
    </form>
  );
};

export default ProductForm;
