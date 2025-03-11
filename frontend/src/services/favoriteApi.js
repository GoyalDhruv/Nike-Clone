import { getItemFromLocalStorage } from "../utils/utils";
import api from "./api";
import { FAVORITE_API_END_POINT } from './constants';
const token = getItemFromLocalStorage()?.token;

export const getAllFavorites = async (thisToken = "") => {
    try {

        const response = await api.get(`${FAVORITE_API_END_POINT}/getFavorites`, {
            headers: {
                "Authorization": `Bearer ${token || thisToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;

    }
};

export const deleteFavoriteItem = async (id, color) => {
    try {
        const response = await api.delete(`${FAVORITE_API_END_POINT}/deletefavorite/${id}/${color}`,
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

export const addToFavorites = async (productId, data) => {
    try {
        const response = await api.post(`${FAVORITE_API_END_POINT}/addFavorite/${productId}`, data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return response.data?.data;
    } catch (error) {
        console.error('Error in adding item to cart:', error);
        throw error;
    }
}