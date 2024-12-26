import React from 'react'
import PropTypes from 'prop-types'

function ProductsList({ showFilters, data }) {

    return (
        <>
            <div className={`col-span-12 ${showFilters ? "lg:col-span-10" : "lg:col-span-12"}`}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {data?.data.map((item) => (
                        <div key={item._id} className='cursor-pointer'>
                            {/* <a href={product.href}> */}
                            <img
                                src={item?.colorVariants?.[0]?.images?.[0]}
                                alt='cover img'
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4">
                                <h3 className="text-md font-semibold tracking-tight">
                                    {item?.title}
                                    <p className="text-md text-textPrimary font-semibold capitalize">{item?.category}</p>
                                </h3>
                                <p className="text-md font-semibold mt-2 flex justify-between">
                                    <div className='text-dark'>${item?.discountedPrice}</div>
                                    <div className=' text-textPrimary line-through'>MRP ${item?.price}</div>
                                </p>
                            </div>
                            {/* </a> */}
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

ProductsList.propTypes = {
    showFilters: PropTypes.bool,
    data: PropTypes.object,
    isLoading: PropTypes.bool,
}

export default ProductsList