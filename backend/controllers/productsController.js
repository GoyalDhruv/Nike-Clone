const Product = require('../models/products.model')

function calculateDiscountedPrice(price, discount) {
    if (discount) {
        return Math.round(price * (1 - discount / 100));
    }
    return price;
}

function validateStock(stock, colorVariants) {
    const totalVariantStock = colorVariants.reduce((acc, variant) => acc + variant.stock, 0);
    return stock <= totalVariantStock;
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { title, price, discount, stock, colorVariants } = req.body;

        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product already exists'
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be greater than 0'
            });
        }

        if (stock && colorVariants) {
            if (!validateStock(stock, colorVariants)) {
                return res.status(400).json({
                    success: false,
                    message: 'Total stock cannot exceed the sum of stock in color variants'
                });
            }
        }


        const newProduct = new Product(req.body);

        if (price && discount) {
            newProduct.discountedPrice = calculateDiscountedPrice(price, discount);
        }

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

exports.updateProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById({ _id: id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (price && price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be greater than 0'
            });
        }

        if (stock || colorVariants) {
            if (!validateStock(updatedStock, updatedColorVariants)) {
                return res.status(400).json({
                    success: false,
                    message: 'Total stock cannot exceed the sum of stock in color variants'
                });
            }
        }

        const { title, details, price, discount, colorVariants, category, gender, kids, stock, rating, origin, declaration, marketedBy, highlight } = req.body
        const updateData = {};
        if (title) updateData.title = title;
        if (details) updateData.details = details;
        if (price) updateData.price = price;
        if (discount) updateData.discount = discount;
        if (colorVariants) updateData.colorVariants = colorVariants;
        if (category) updateData.category = category;
        if (gender) updateData.gender = gender;
        if (kids) updateData.kids = kids;
        if (stock) updateData.stock = stock;
        if (rating) updateData.rating = rating;
        if (origin) updateData.origin = origin;
        if (declaration) updateData.declaration = declaration;
        if (marketedBy) updateData.marketedBy = marketedBy;
        if (highlight) updateData.highlight = highlight;
        if (price && discount) {
            updateData.discountedPrice = calculateDiscountedPrice(price, discount);
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.deleteProductById = async (req, res) => {
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