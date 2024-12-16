import React from 'react'
import PropTypes from 'prop-types';

function TextOnImage({ item,ImgClass }) {
    return (
        <div className='relative cursor-pointer'>
            <img src={item.image} alt={item.image} loading="lazy" className={ImgClass} />
            <p className='black-btn absolute z-100 bottom-6 left-6 md:px-4'>{item?.text}</p>
        </div>
    )
}

TextOnImage.propTypes = {
    item: PropTypes.object.isRequired,
    ImgClass: PropTypes.string
}

export default TextOnImage