import Product from "../models/products.model.js";
import User from '../models/users.model.js';
import Order from "../models/orders.model.js";
import { paginate } from "../utils/paginate.js";

function calculateDiscountedPrice(price, discount) {
    if (discount) {
        return Math.round(price * (1 - discount / 100));
    }
    return price;
}

export const getAllProducts = async (req, res) => {
    try {
        const { products, pagination } = await paginate(Product, {}, {
            page: req.query.page,
            limit: req.query.limit,
            select: 'title price discountedPrice category variants',
            resourceName: 'products',
        });

        res.status(200).json({
            success: true,
            products,
            pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            title,
            details,
            price,
            discount,
            category,
            variants,
            sports
        } = req.body;

        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product already exists'
            });
        }

        if (!details || !category || !sports) {
            return res.status(400).json({
                success: false,
                message: 'Details, Category and type are required'
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be greater than 0'
            });
        }

        if (discount && (discount < 0 || discount > 100)) {
            return res.status(400).json({
                success: false,
                message: 'Discount must be between 0 and 100%'
            });
        }

        const updatedVariants = variants.map(variant => {
            if (!variant.size || !variant.color || variant.stock < 0) {
                throw new Error('Each variant must have a valid size, color, and stock.');
            }
            if (!variant.images || variant.images.length === 0) {
                throw new Error('Each variant must have at least one image');
            }

            variant.coverImg = variant.images[0];

            return variant;
        });
        let status = []
        if (discount > 0) {
            status.push('discount')
        }

        const discountedPrice = calculateDiscountedPrice(price, discount)

        const newProduct = new Product({
            ...req.body,
            discountedPrice,
            variants: updatedVariants,
            status
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const {
            title,
            details,
            price,
            discount,
            variants,
            category,
            sports,
        } = req.body;

        if (price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be greater than 0'
            });
        }

        if (discount && (discount < 0 || discount > 100)) {
            return res.status(400).json({
                success: false,
                message: 'Discount must be between 0 and 100%'
            });
        }

        if (!title || !details || !category || !sports) {
            return res.status(400).json({
                success: false,
                message: 'Details, Category and type are required'
            });
        }

        const updatedVariants = variants.map(variant => {
            if (!variant.size || !variant.color || variant.stock < 0) {
                throw new Error('Each variant must have a valid size, color, and stock.');
            }
            if (!variant.images || variant.images.length === 0) {
                throw new Error('Each variant must have at least one image');
            }

            variant.coverImg = variant.images[0];

            return variant;
        });

        const updateData = {};

        const validCategories = ['shoes', 'clothes']

        if (category) {
            if (!(validCategories).includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category'
                });
            }
            updateData.category = category;
        }

        if (title) updateData.title = title;
        if (details) updateData.details = details;
        if (discount) updateData.discount = Number(discount);
        if (price) updateData.price = price;
        const discountedPrice = calculateDiscountedPrice(price, Number(discount))
        updateData.discountedPrice = discountedPrice;
        updateData.variants = updatedVariants;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const { users, pagination } = await paginate(User, { role: "User" }, {
            page: req.query.page,
            limit: req.query.limit,
            select: 'firstName lastName email createdAt dateOfBirth',
            resourceName: 'users',
        });

        res.status(200).json({
            success: true,
            users,
            pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const { orders, pagination } = await paginate(Order, {}, {
            page: req.query.page,
            limit: req.query.limit,
            resourceName: 'orders',
            populate: { path: 'user', select: 'firstName lastName email' },
            sort: { createdAt: -1 }
        });

        res.status(200).json({
            success: true,
            orders,
            pagination
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        const [
            totalUsers,
            totalOrders,
            currentMonthUsers,
            lastMonthUsers,
            currentMonthOrders,
            lastMonthOrders,
            totalRevenueAgg,
            currentMonthRevenueAgg,
            lastMonthRevenueAgg,
            revenueAccordingToMonth,
            topProducts
        ] = await Promise.all([
            User.countDocuments({ role: "User" }),
            Order.countDocuments(),
            User.countDocuments({ role: "User", createdAt: { $gte: currentMonthStart } }),
            User.countDocuments({ role: "User", createdAt: { $gte: lastMonthStart, $lt: currentMonthStart } }),
            Order.countDocuments({ createdAt: { $gte: currentMonthStart } }),
            Order.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: currentMonthStart } }),
            Order.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }]),
            Order.aggregate([
                { $match: { createdAt: { $gte: currentMonthStart } } },
                { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }
            ]),
            Order.aggregate([
                { $match: { createdAt: { $gte: lastMonthStart, $lt: currentMonthStart } } },
                { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }
            ]),
            Order.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        totalAmount: { $sum: "$totalAmount" }
                    }
                },
                { $sort: { _id: 1 } }
            ]),
            Order.aggregate([
                { $unwind: "$products" },
                {
                    $group: {
                        _id: "$products.product",
                        totalSold: { $sum: "$products.quantity" }
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "_id",
                        as: "product"
                    }
                },
                { $unwind: "$product" },
                {
                    $project: {
                        _id: 0,
                        name: "$product.title",
                        totalSold: 1
                    }
                },
                { $sort: { totalSold: -1 } },
                { $limit: 5 }
            ]),
            Order.aggregate([
                {
                    $group: {
                        _id: "$userId",
                        firstOrderDate: { $min: "$createdAt" }
                    }
                }
            ])
        ]);

        const currentRevenue = currentMonthRevenueAgg[0]?.totalAmount || 0;
        const lastRevenue = lastMonthRevenueAgg[0]?.totalAmount || 0;
        const totalRevenue = totalRevenueAgg[0]?.totalAmount || 0;

        const userGrowth = ((currentMonthUsers - lastMonthUsers) / (lastMonthUsers || 1)) * 100;
        const orderGrowth = ((currentMonthOrders - lastMonthOrders) / (lastMonthOrders || 1)) * 100;
        const revenueGrowth = ((currentRevenue - lastRevenue) / (lastRevenue || 1)) * 100;

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                usersGrowth: Number(userGrowth.toFixed(2)),
                totalOrders,
                ordersGrowth: Number(orderGrowth.toFixed(2)),
                totalRevenue,
                revenueGrowth: Number(revenueGrowth.toFixed(2)),
                revenueAccordingToMonth,
                topProducts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
