require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutesAdmin = require('./routes/productRoutesAdmin');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Configura o CORS para permitir o frontend
app.use(cors({
    origin: 'http://localhost:3000' // Permite somente o frontend
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', productRoutesAdmin);
// app.use('/products', productRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
