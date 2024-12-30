import api from "./api";

export const getAllProducts = async ({ queryKey }) => {
    try {
        const [, filters] = queryKey;

        const response = await api.get('/getProducts', {
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
        const response = await api.post('/createProduct', data,
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
        const response = await api.post('/uploadFile', formData, {
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

export const getProductById = async ({ queryKey }) => {
    const [, { id }] = queryKey;
    try {
        const response = await api.get(`/getProduct/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetching details of the product:', error);
    }
}
