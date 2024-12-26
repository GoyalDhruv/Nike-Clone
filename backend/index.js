import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import productsRoute from './routes/productsRoute.js';
const app = express();

app.use(cors())
app.use(express.json());

app.use('/v1/api/products', productsRoute);

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
