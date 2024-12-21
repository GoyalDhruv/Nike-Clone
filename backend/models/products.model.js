// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     details: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     discount: {
//         type: Number,
//         required: true
//     },
//     colorVariants: [{
//         color: {
//             type: String,
//             required: true
//         },
//         images: [{
//             type: String,
//             required: true
//         }],
//         sizes: [{
//             type: String,
//             required: true
//         }],
//         stock: {
//             type: Number,
//             required: true,
//             min: 0,
//             default: 0
//         }
//     }],
//     category: {
//         type: String,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     },
//     kids: {
//         type: Boolean,
//         default: false
//     },
//     stock: {
//         type: Number,
//         required: true,
//         min: 0,
//         default: 0,
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 5,
//         default: 0
//     },
//     origin: {
//         type: String,
//         required: true
//     },
//     declaration: {
//         type: String,
//         required: true
//     },
//     marketedBy: {
//         type: String,
//         required: true
//     },
//     highlight: {
//         type: String,
//         required: true
//     },
//     discountedPrice: {
//         type: Number,
//         required: true,
//         validate: {
//             validator: function (value) {
//                 return value <= this.price;
//             },
//             message: 'Discounted price cannot be greater than the original price'
//         }
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const shoeSchema = mongoose.Schema({
    model: { type: String, required: true },
    sizeVariants: [{
        size: { type: String, required: true },
        stock: { type: Number, default: 0 }
    }],
    colorVariants: [{
        color: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 0 }
    }]
});

const clothingSchema = mongoose.Schema({
    sizeVariants: [{
        size: { type: String, required: true },
        stock: { type: Number, default: 0 }
    }],
    colorVariants: [{
        color: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 0 }
    }]
});

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
    category: {
        type: String,
        required: true,
        enum: ['Shoes', 'Clothing', 'Accessories', 'Sports Gear']
    },
    subCategory: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const validSubCategories = {
                    Shoes: ['Running Shoes', 'Casual Shoes', 'Sneakers', 'Boots'],
                    Clothing: ['T-Shirts', 'Jackets', 'Pants', 'Shorts'],
                    Accessories: ['Bags', 'Hats', 'Socks', 'Watches'],
                    'Sports Gear': ['Equipment', 'Balls', 'Gloves', 'Helmets']
                };
                return validSubCategories[this.category]?.includes(value);
            },
            message: (props) => `${props.value} is not a valid subcategory for ${props.instance.category}`
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Unisex', 'Kids']
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
    // reviews: [{
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     rating: { type: Number, min: 0, max: 5, required: true },
    //     reviewText: { type: String, maxlength: 500 },
    //     createdAt: { type: Date, default: Date.now }
    // }],    
    shoeDetails: {
        type: shoeSchema,
        required: function () {
            return this.category === 'Shoes';
        }
    },
    clothingDetails: {
        type: clothingSchema,
        required: function () {
            return this.category === 'Clothing';
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
