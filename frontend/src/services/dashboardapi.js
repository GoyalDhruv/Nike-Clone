
import { getTokenFromLocalStorage } from "../utils/utils";
import api from "./api";
import { DASHBOARD_API_END_POINT } from './constants'

export const getAllDashboardProduct = async (page, limit) => {
    try {
        const response = await api.get(`${DASHBOARD_API_END_POINT}/getAllProducts?page=${page}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${getTokenFromLocalStorage()}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;

    }
};

export const createProduct = async (data) => {
    try {
        const response = await api.post(`${DASHBOARD_API_END_POINT}/createProduct`, data,
            {
                headers: {
                    "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
                }
            }
        );
        return response.data;
    }
    catch (error) {
        console.error('Error in creating the product:', error);
        throw error;
    }
}

export const updateProduct = async (data) => {
    const { values, id } = data
    try {
        const response = await api.patch(`${DASHBOARD_API_END_POINT}/updateProduct/${id}`, values,
            {
                headers: {
                    "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
                }
            }
        );
        return response.data;
    }
    catch (error) {
        console.error('Error in updating the product:', error);
        throw error;
    }
}

