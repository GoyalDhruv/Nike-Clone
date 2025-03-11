import Favorite from "../models/favourites.model.js";
import Product from "../models/products.model.js";

export const addToFavorites = async (req, res) => {
    try {
        const { userId } = req.user;
        const { color } = req.body;

        if (!color) {
            return res.status(400).json({
                success: false,
                message: 'Color is required'
            });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const variant = product.variants.find(v => v.color === color);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const isFavoriteItem = await Favorite.exists({
            user: userId,
            product: product._id,
            color
        });

        if (isFavoriteItem) {
            return res.status(400).json({
                success: false,
                message: 'Item already in Favorites'
            });
        }

        let favoriteItem = new Favorite({
            user: userId,
            product: product._id,
            color
        });

        await favoriteItem.save();

        res.status(200).json({
            success: true,
            message: 'Item Add to Favorite',
            favoriteItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getFavorites = async (req, res) => {
    try {
        const { userId } = req.user;
        const favorites = await Favorite.find({ user: userId }).populate('product', ['title', 'details', 'variants', 'price', 'discountedPrice']);
        res.status(200).json({
            success: true,
            favorites
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const removeFromFavorites = async (req, res) => {
    try {
        const { userId } = req.user;
        const favorite = await Favorite.findOneAndDelete({ user: userId, product: req.params.id, color: req.params.color });
        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorite not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Item removed from Favorites'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}