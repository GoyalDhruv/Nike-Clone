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
                page: filters.currentPage,
                limit: filters.limit
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetching the details:', error);
        throw error;

    }
};

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
        const response = await api.get(`${PRODUCT_API_END_POINT}/getProduct/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetching details of the product:', error);
    }
}

export const getClassicProducts = async () => {
    try {
        const response = await api.get(`${PRODUCT_API_END_POINT}/getClassicProducts`);
        return response.data?.data;
    } catch (error) {
        console.error('Error in fetching classic products:', error);
        throw error;
    }
}