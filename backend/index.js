import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import productsRoute from './routes/products.routes.js';
import usersRoute from './routes/users.routes.js';
import cartsRoute from './routes/carts.routes.js';
import favoritesRoute from './routes/favourites.routes.js'
import paymentRoute from './routes/payment.routes.js';
import orderRoutes from './routes/orders.routes.js';
import { sendOrderConfirmationEmail } from './config/sendgrid.js';

const app = express();

app.use(cors())
app.use(express.json());

app.use('/v1/api/products', productsRoute);
app.use('/v1/api/users', usersRoute);
app.use('/v1/api/cart', cartsRoute);
app.use('/v1/api/favourite', favoritesRoute);
app.use('/v1/api/payment', paymentRoute);
app.use("/v1/api/orders", orderRoutes);
app.get('/success', (req, res) => {
    const sessionId = req.query.session_id;
    res.send(`<h1>Payment Successful!</h1><p>Session ID: ${sessionId}</p>`);
});

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
