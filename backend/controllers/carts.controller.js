import Product from '../models/products.model.js';
import Cart from '../models/carts.model.js';
import mongoose from 'mongoose';

export const addToCart = async (req, res) => {
    try {
        const { quantity, size, color } = req.body;
        const { userId } = req.user;
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
                message: 'Product not found'
            });
        }

        const totalPrice = product.price * Number(quantity);
        const discountedPrice = product.discountedPrice
            ? product.discountedPrice * Number(quantity)
            : totalPrice;

        let cartItem = await Cart.findOne({
            user: userId,
            product: product._id,
            size,
            color
        });

        if (cartItem) {
            cartItem.quantity = Number(quantity);
            cartItem.totalPrice = product.price * cartItem.quantity;
            cartItem.discountedPrice = product.discountedPrice
                ? product.discountedPrice * cartItem.quantity
                : cartItem.totalPrice;

            await cartItem.save();
        } else {
            cartItem = new Cart({
                user: userId,
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
        const { userId } = req.user;

        const objectIdUserId = new mongoose.Types.ObjectId(userId);

        const cartItems = await Cart.aggregate([
            {
                $match: { user: objectIdUserId }
            },
            {
                $lookup: {
                    from: "products",
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails',
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    _id: 0,
                    product: "$productDetails._id",
                    title: "$productDetails.title",
                    image: {
                        $arrayElemAt: [
                            {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$productDetails.variants",
                                            as: "variant",
                                            cond: { $eq: ["$$variant.color", "$color"] },
                                        },
                                    },
                                    as: "matchedVariant",
                                    in: "$$matchedVariant.coverImg",
                                },
                            },
                            0,
                        ],
                    },
                    _id: 1,
                    quantity: 1,
                    size: 1,
                    color: 1,
                    totalPrice: 1,
                    discountedPrice: 1,
                },
            }
        ])

        let grandTotalPrice = cartItems.reduce((sum, item) => sum + item?.discountedPrice*item?.quantity, 0)

        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Cart is empty',
                data:{}
            });
        }

        res.status(200).json({
            success: true,
            data: { cartItems, grandTotalPrice }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id, color } = req.params;

        const cartItem = await Cart.findOne({ _id: id, user: userId, color: color });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await Cart.deleteOne({ _id: id, user: userId, color: color });

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

