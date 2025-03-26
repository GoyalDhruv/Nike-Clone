import { sendOrderConfirmationEmail } from "../config/sendgrid.js";
import Order from "../models/orders.model.js";
import User from "../models/users.model.js";
import { ObjectId } from 'mongodb'

// Check if the product is in stock or not

const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products in the order" });
        }

        const orderId = `order_${generateRandomString(12)}`;
        const paymentId = `pay_${generateRandomString(12)}`;

        const order = new Order({
            orderId,
            paymentId,
            user: req.user.userId,
            products,
            totalAmount,
            paymentStatus: "paid",
        });

        await order.save();

        await sendOrderConfirmationEmail(req.user.email, order);

        res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 }).populate("user", "email firstName lastName");
        res.status(200).json({ success: true, message: "Order fetched successfully", orders });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { email } = req.query;
        const { orderId } = req.params;

        if (!orderId || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid Order ID" });
        }

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const order = await Order.findOne({
            _id: orderId,
            user: user._id
        }).populate("user", "email firstName lastName");;

        if (!order || order.length === 0) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order fetched successfully", order });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}