import React from 'react'
import PropTypes from 'prop-types';


function ProductDetails({ data }) {
    return (
        <>
            <h4 className='text-2xl font-semibold tracking-tight'>{data?.data?.title}</h4>
            <p className='capitalize text-textPrimary font-medium'>
                {data?.data?.gender}&apos;s {data?.data?.category}
            </p>

            <div className='my-3 flex gap-4'>
                <span className='font-semibold tracking-tight'>₹ {data?.data?.price}</span>
                {data?.data?.discount != 0 &&
                    <span className='text-textPrimary font-medium tracking-tight'>
                        MRP: ₹ {data?.data?.discountedPrice}
                    </span>
                }
            </div>
            <div className='text-textPrimary text-sm font-medium'>
                <p>Inclusive of all taxes</p>
                <p>(Also includes all applicable duties)</p>
            </div>
        </>
    )
}

ProductDetails.propTypes = {
    data: PropTypes.object.isRequired,
}

export default ProductDetails