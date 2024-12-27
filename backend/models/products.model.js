import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountedPrice: {
        type: Number,
        default: function () {
            return this.price - (this.price * (this.discount / 100));
        },
        validate: {
            validator: function (value) {
                return value <= this.price;
            },
            message: 'Discounted price cannot be greater than the original price'
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['shoes', 'clothes']
    },
    stock: { type: Number, default: 0, min: 0 },
    gender: {
        type: String,
        enum: ['men', 'women', 'unisex']
    },
    isKids: {
        type: Boolean,
        default: false
    },
    kids: {
        type: String,
        enum: ['girls', 'boys']
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    variants: [{
        size: { type: String, required: true },
        color: { type: String, required: true },
        stock: { type: Number, default: 0 },
        images: {
            type: [String],
            required: true,
            validate: [arr => arr.length > 0, 'At least one image is required']
        }
    }],
    status: {
        type: [String],
        enum: ['discount', 'trending', 'new_arrival', 'bestseller'],
        default: []
    },
    sports: {
        type: [String],
        enum: ['running', 'football', 'basketball', 'training and gym', 'tennis', 'yoga', 'skateboarding', 'dance', 'lifestyle'],
        default: []
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;