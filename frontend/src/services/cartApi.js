import { getItemFromLocalStorage } from "../utils/utils";
import api from "./api";
import { CART_API_END_POINT } from "./constants";
const token = getItemFromLocalStorage()?.token;

export const getCart = async (thisToken = "") => {
    try {
        const response = await api.get(`${CART_API_END_POINT}/getCart`,
            {
                headers: {
                    "Authorization": `Bearer ${token || thisToken}`
                }
            }
        );
        return response.data?.data;
    } catch (error) {
        console.error('Error in fetching cart details:', error);
        throw error;
    }
}

export const addToCart = async (productId, data) => {
    try {
        const response = await api.post(`${CART_API_END_POINT}/addToCart/${productId}`, data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data?.data;
    } catch (error) {
        console.error('Error in adding item to cart:', error);
        throw error;
    }
}

export const deleteCartItem = async (productId, color) => {
    try {
        const response = await api.delete(`${CART_API_END_POINT}/deleteCartItem/${productId}/${color}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return response.data?.data;
    } catch (error) {
        console.error('Error in deleting cart item:', error);
        throw error;
    }
}

export const clearCart = async () => {
    return await api.delete(`${CART_API_END_POINT}/clearCart`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};
