import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import favoriteReducer from './slices/favoriteSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
    },
});

export default store;
