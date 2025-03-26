import React from 'react'
import PropTypes from 'prop-types'

function CustomContainer({ children, customClass }) {
    return (
        <div className={`md:px-12 px-6 ${customClass}`}>
            {children}
        </div>
    )
}

CustomContainer.propTypes = {
    children: PropTypes.node,
    customClass: PropTypes.string,
}


export default CustomContainer