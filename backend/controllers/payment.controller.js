import stripe from '../config/stripe.js';
import dotenv from 'dotenv';
dotenv.config();

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, email } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                    description: `Size: ${product.size}, Color: ${capitalizeFirstLetter(product.color)}`,
                    images: [product.image.trim()],
                    metadata: { productId: product.product },
                },
                unit_amount: product.discountedPrice * 100,
            },
            quantity: product.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: email,
            line_items: lineItems,
            success_url: `${process.env.FRONT_END_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONT_END_URL}/cart`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const checkPaymentStatus = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        res.json({ payment_status: session.payment_status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};