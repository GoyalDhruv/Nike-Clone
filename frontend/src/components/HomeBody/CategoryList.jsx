import React, { useState } from 'react'
import PropTypes from 'prop-types';

function CategoryList({ title, items }) {

    const [isActive, setIsActive] = useState(false)
    return (
        <div className={isActive ? "mb-3" : ""}>
            <h3 className='text-2xl font-bold tracking-tight cursor-default' onClick={() => { setIsActive(!isActive) }}>{title}</h3>
            <ul className={`mt-6 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? 'max-h-[500px]' : 'max-h-0'
                } md:max-h-none`}
            >
                {items.map((item, index) => (
                    <li className='mb-3 text-md cursor-pointer font-medium text-[#707072] hover:text-black' key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

CategoryList.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CategoryList