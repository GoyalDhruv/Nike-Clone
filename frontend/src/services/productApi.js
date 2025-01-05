import api from "./api";
import { PRODUCT_API_END_POINT } from './constants';

export const getAllProducts = async ({ queryKey }) => {
    try {
        const [, filters] = queryKey;

        const response = await api.get(`${PRODUCT_API_END_POINT}/getProducts`, {
            params: {
                category: filters.selectedCategory,
                color: filters.selectedColors.join(','),
                size: filters.selectedSizes.join(','),
                gender: filters.selectedGenders.join(','),
                sports: filters.selectedSports.join(','),
                kids: filters.selectedKidSection.join(','),
                status: filters.selectedStatus,
                sort: filters.selectedSort.sort,
                order: filters.selectedSort.order,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;

    }
};

export const createProduct = async (data) => {
    try {
        const response = await api.post(`${PRODUCT_API_END_POINT}/createProduct`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
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

export const uploadFile = async (formData, onUploadProgress) => {
    try {
        const response = await api.post(`${PRODUCT_API_END_POINT}/uploadFile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading the file:', error);
        throw error;
    }
}

export const deleteFile = async (public_id) => {
    try {
        const response = await api.delete(`${PRODUCT_API_END_POINT}/deleteFile`, { data: { public_id } });
        return response.data;
    } catch (error) {
        console.error('Error deleting the file:', error);
        throw error;
    }
}

export const getProductById = async ({ queryKey }) => {
    const [, { id }] = queryKey;
    try {
        const response = await api.get(`/getProduct/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetching details of the product:', error);
    }
}
