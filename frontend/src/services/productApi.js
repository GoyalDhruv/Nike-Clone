import api from "./api";

export const getAllProducts = async ({ queryKey }) => {
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
};
