export const paginate = async (model, query = {}, options = {}) => {
    const {
        page = 1,
        limit = 10,
        select = '',
        sort = {},
        populate = '',
        resourceName = 'products',
    } = options;

    const skip = (page - 1) * limit;
    console.log(query)
    try {
        const queryBuilder = model.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .select(select);

        if (populate) queryBuilder.populate(populate);

        const data = await queryBuilder;
        const totalItems = await model.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        return {
            [resourceName]: data,
            pagination: {
                totalItems: Number(totalItems),
                totalPages,
                currentPage: Number(page),
                pageSize: Number(limit),
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};