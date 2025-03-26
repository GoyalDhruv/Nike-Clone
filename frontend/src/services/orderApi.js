import { ORDER_API_END_POINT } from './constants';
import api from "./api";
import { getTokenFromLocalStorage } from "../utils/utils";


export const createOrder = async (data) => {
    try {
        const response = await api.post(`${ORDER_API_END_POINT}/createOrder`, data,
            {
                headers: {
                    "Authorization": `Bearer ${getTokenFromLocalStorage()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;
    }
};

export const getOrderById = async (orderId, email) => {
    try {
        const response = await api.get(`${ORDER_API_END_POINT}/getOrderById/${orderId}`,
            {
                params: { email },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;
    }
}

export const getAllOrders = async () => {
    try {
        const response = await api.get(`${ORDER_API_END_POINT}/getAllOrdersByUser`, {
            headers: {
                "Authorization": `Bearer ${getTokenFromLocalStorage()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;
    }
}
