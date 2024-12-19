const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    colorVariants: [{
        color: {
            type: String,
            required: true
        },
        images: [{
            type: String,
            required: true
        }],
        sizes: [{
            type: String,
            required: true
        }],
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }],
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    kids: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    origin: {
        type: String,
        required: true
    },
    declaration: {
        type: String,
        required: true
    },
    marketedBy: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value <= this.price;
            },
            message: 'Discounted price cannot be greater than the original price'
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
