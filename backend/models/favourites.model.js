import mongoose from 'mongoose';

const FavoriteSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    color: {
        type: String,
        required: true
    },
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;