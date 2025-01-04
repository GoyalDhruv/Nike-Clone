import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import productsRoute from './routes/products.route.js';
import usersRoute from './routes/users.route.js';
const app = express();

app.use(cors())
app.use(express.json());

app.use('/v1/api/products', productsRoute);
app.use('/v1/api/users', usersRoute)

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
