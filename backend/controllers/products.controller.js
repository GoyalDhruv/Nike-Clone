import Product from '../models/products.model.js';
import { paginate } from '../utils/paginate.js';

export const getAllProducts = async (req, res) => {
    const { category, color, size, gender, sports, kids, status, sort, order } = req.query;

    let query = {};

    if (category) query.category = category;
    if (color) query['variants.color'] = { $in: color.split(',') };
    if (size) query['variants.size'] = { $in: size.split(',') };
    if (gender) query.gender = { $in: gender.split(',') };
    if (sports) query.sports = { $in: sports.split(',') };
    if (kids) query.kids = { $in: kids.split(',') };
    if (status) query.status = { $in: status.split(',') };

    // Sorting options
    let sortOptions = {};
    if (sort && order) {
        sortOptions[sort] = order === 'asc' ? 1 : -1;
    }

    try {
        const { products, pagination } = await paginate(Product, sortOptions, {
            page: req.query.page,
            limit: req.query.limit,
            filters: query,
        });

        res.status(200).json({
            success: true,
            products,
            pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getProductById = async (req, res) => {
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

export const getClassicProduct = async (req, res) => {
    try {
        const classicProducts = await Product.find({ status: 'classics' })
        res.status(200).json({
            success: true,
            data: classicProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}