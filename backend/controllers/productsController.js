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
        const {
            title,
            price,
            discount,
            stock,
            category,
            subCategory,
            shoeDetails,
            clothingDetails
        } = req.body;

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

        const validSubCategories = {
            Shoes: ['Running Shoes', 'Casual Shoes', 'Sneakers', 'Boots'],
            Clothing: ['T-Shirts', 'Jackets', 'Pants', 'Shorts'],
            Accessories: ['Bags', 'Hats', 'Socks', 'Watches'],
            'Sports Gear': ['Equipment']
        };

        if (!Object.keys(validSubCategories).includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            });
        }

        if (!validSubCategories[category].includes(subCategory)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid subCategory for the selected category'
            });
        }

        if (stock && req.body.colorVariants) {
            const totalColorVariantStock = req.body.colorVariants.reduce(
                (total, variant) => total + (variant.stock || 0),
                0
            );
            if (stock !== totalColorVariantStock) {
                return res.status(400).json({
                    success: false,
                    message: 'Total stock must match the sum of stock in color variants'
                });
            }
        }

        if (category === 'Shoes' && !shoeDetails) {
            return res.status(400).json({
                success: false,
                message: 'Shoe details are required for Shoes category'
            });
        }

        if (category === 'Clothing' && !clothingDetails) {
            return res.status(400).json({
                success: false,
                message: 'Clothing details are required for Clothing category'
            });
        }

        const discountedPrice = price - (price * discount) / 100;

        const newProduct = new Product({
            ...req.body,
            discountedPrice
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

exports.updateProductById = async (req, res) => {
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
            colorVariants,
            category,
            subCategory,
            gender,
            kids,
            stock,
            rating,
            origin,
            declaration,
            marketedBy,
            highlight,
            shoeDetails,
            clothingDetails
        } = req.body;

        const updateData = {};

        if (price && price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be greater than 0'
            });
        }
        if (price) updateData.price = price;

        const validSubCategories = {
            Shoes: ['Running Shoes', 'Casual Shoes', 'Sneakers', 'Boots'],
            Clothing: ['T-Shirts', 'Jackets', 'Pants', 'Shorts'],
            Accessories: ['Bags', 'Hats', 'Socks', 'Watches'],
            'Sports Gear': ['Equipment']
        };

        if (category) {
            if (!Object.keys(validSubCategories).includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category'
                });
            }
            updateData.category = category;
        }

        if (subCategory) {
            if (!validSubCategories[category]?.includes(subCategory)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid subCategory for the selected category'
                });
            }
            updateData.subCategory = subCategory;
        }

        if (stock && colorVariants) {
            const totalColorVariantStock = colorVariants.reduce(
                (total, variant) => total + (variant.stock || 0),
                0
            );
            if (stock !== totalColorVariantStock) {
                return res.status(400).json({
                    success: false,
                    message: 'Total stock must match the sum of stock in color variants'
                });
            }
        }

        if (category === 'Shoes' && shoeDetails) {
            updateData.shoeDetails = shoeDetails;
        } else if (category === 'Shoes' && !shoeDetails) {
            return res.status(400).json({
                success: false,
                message: 'Shoe details are required for Shoes category'
            });
        }

        if (category === 'Clothing' && clothingDetails) {
            updateData.clothingDetails = clothingDetails;
        } else if (category === 'Clothing' && !clothingDetails) {
            return res.status(400).json({
                success: false,
                message: 'Clothing details are required for Clothing category'
            });
        }

        if (title) updateData.title = title;
        if (details) updateData.details = details;
        if (discount) updateData.discount = discount;
        if (colorVariants) updateData.colorVariants = colorVariants;
        if (gender) updateData.gender = gender;
        if (kids !== undefined) updateData.kids = kids;
        if (stock) updateData.stock = stock;
        if (rating) updateData.rating = rating;
        if (origin) updateData.origin = origin;
        if (declaration) updateData.declaration = declaration;
        if (marketedBy) updateData.marketedBy = marketedBy;
        if (highlight) updateData.highlight = highlight;

        if (price && discount) {
            updateData.discountedPrice = price - (price * discount) / 100;
        }

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