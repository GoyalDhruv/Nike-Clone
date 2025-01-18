import Product from '../models/products.model.js';
import Cart from '../models/cart.model.js';

import Product from '../models/products.model.js';
import Cart from '../models/cart.model.js';

export const addToCart = async (req, res) => {
    try {
        const { quantity, size, color } = req.body;
        const { id } = req.user;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const variant = product.variants.find(v => v.size.includes(size) && v.color === color);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found'
            });
        }

        const totalPrice = product.price * quantity;
        const discountedPrice = product.discountedPrice
            ? product.discountedPrice * quantity
            : totalPrice;

        let cartItem = await Cart.findOne({
            user: id,
            product: product._id,
            size,
            color
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice = product.price * cartItem.quantity;
            cartItem.discountedPrice = product.discountedPrice
                ? product.discountedPrice * cartItem.quantity
                : cartItem.totalPrice;

            await cartItem.save();
        } else {
            cartItem = new Cart({
                user: id,
                product: product._id,
                quantity,
                size,
                color,
                totalPrice,
                discountedPrice
            });

            await cartItem.save();
        }

        res.status(200).json({
            success: true,
            message: cartItem ? 'Cart item updated' : 'Product added to cart',
            cartItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getCart = async (req, res) => {
    try {
        const { id } = req.user;

        const cartItems = await Cart.find({ user: id }).populate('product', 'title variants coverImg');

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        const cartItemsWithImages = [];

        for (const cartItem of cartItems) {
            const product = cartItem.product;
            const variant = product.variants.find(v => v.size.includes(cartItem.size) && v.color === cartItem.color);

            const coverImg = variant?.coverImg;

            cartItemsWithImages.push({
                ...cartItem.toObject(),
                coverImg
            });
        }

        res.status(200).json({
            success: true,
            cartItems: cartItemsWithImages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

import Cart from '../models/cart.model.js';

export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.user;
        const { cartItemId } = req.params;

        const cartItem = await Cart.findOne({ _id: cartItemId, user: id });
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await cartItem.remove();

        res.status(200).json({
            success: true,
            message: 'Cart item removed successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

