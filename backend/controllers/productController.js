const Product = require('../models/productModel');

exports.updateStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      product.quantity = quantity;
      await product.save();
      res.json({ message: 'Stock updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Outros métodos para gerenciamento de produtos
