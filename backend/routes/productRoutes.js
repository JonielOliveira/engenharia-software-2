const express = require('express');
const { updateStock } = require('../controllers/productController');
const router = express.Router();

router.put('/update', updateStock);

module.exports = router;
