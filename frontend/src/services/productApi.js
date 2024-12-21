import api from "./api";

export const getAllProducts = async () => {
    try {
        const response = await api.get('/getProducts');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
