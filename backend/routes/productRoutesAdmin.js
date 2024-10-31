const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  listAllProducts,
  getProductById,
  getActiveProducts,
  getInactiveProducts,
  activateProduct,
  deactivateProduct
} = require('../controllers/productController');

// [6] Obter todos os produtos ativos
router.get('/products/active', getActiveProducts);

// [7] Obter todos os produtos inativos
router.get('/products/inactive', getInactiveProducts);

// [1] Criar um novo produto
router.post('/products', createProduct);

// [2] Atualizar um produto específico
router.put('/products/:productId', updateProduct);

// [3] Deletar um produto específico
router.delete('/products/:productId', deleteProduct);

// [4] Listar todos os produtos
router.get('/products', listAllProducts);

// [5] Obter um produto específico pelo ID
router.get('/products/:productId', getProductById);

// [8] Aprovar um usuário
router.patch('/products/activate/:productId', activateProduct);

// [9] Aprovar um usuário
router.patch('/products/deactivate/:productId', deactivateProduct);

module.exports = router;
