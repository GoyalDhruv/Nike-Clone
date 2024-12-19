const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const productsRoute = require('./routes/productsRoute');
const app = express();

app.use(express.json());

app.use('/v1/api/products', productsRoute);

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
