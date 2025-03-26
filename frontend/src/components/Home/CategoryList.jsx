import React, { useState } from 'react'
import PropTypes from 'prop-types';

function CategoryList({ title, items, listClass, setSelectedStatus }) {

    const [isActive, setIsActive] = useState(false)
    return (
        <div className={isActive ? "mb-3" : ""}>
            <h3 className='text-2xl font-bold tracking-tight cursor-default' onClick={() => { setIsActive(!isActive) }}>{title}</h3>
            <ul className={`${title ? "mt-6" : ""} overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? 'max-h-[500px]' : 'max-h-0'
                } md:max-h-none`}
            >
                {items.map((item, index) => (
                    <li className={`${listClass ? listClass : "text-md font-medium text-textPrimary hover:text-black"} mb-3  cursor-pointer `} key={index}
                        onClick={() => setSelectedStatus ? setSelectedStatus(item) : ""}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

CategoryList.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    listClass: PropTypes.string,
    setSelectedStatus: PropTypes.func
}

export default CategoryList