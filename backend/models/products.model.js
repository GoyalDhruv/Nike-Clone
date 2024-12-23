const mongoose = require('mongoose');

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
        enum: ['Shoes', 'Clothing']
    },
    stock: { type: Number, default: 0, min: 0 },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex']
    },
    isKids: {
        type: Boolean,
        default: false
    },
    kids: {
        type: String,
        enum: ['Girls', 'Boys']
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    sizeVariants: [{
        size: { type: String, required: true },
        stock: { type: Number, default: 0 }
    }],
    colorVariants: [{
        color: { type: String, required: true },
        images: {
            type: [String],
            required: true,
            validate: [arr => arr.length > 0, 'At least one image is required']
        },
        stock: { type: Number, default: 0 }
    }],
    status: {
        type: [String],
        enum: ['discount', 'trending', 'new_arrival', 'bestseller'],
        default: []
    },
    sports: {
        type: [String],
        enum: ['Running', 'Football', 'Basketball', 'Training and Gym', 'Tennis', 'Yoga', 'Skateboarding', 'Dance', 'Lifestyle'],
        default: []
    }
}, { timestamps: true });

productSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);
