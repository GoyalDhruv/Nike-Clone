export const paginate = async (model, query = {}, options = {}) => {
    const {
        page = 1,
        limit = 10,
        select = '',
        sort = {},
        populate = '',
    } = options;

    const skip = (page - 1) * limit;

    try {
        const queryBuilder = model.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(select);

        if (populate) queryBuilder.populate(populate);

        const products = await queryBuilder;
        const totalProducts = await model.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        return {
            products,
            pagination: {
                totalItems: Number(totalProducts),
                totalPages,
                currentPage: Number(page),
                pageSize: Number(limit),
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};