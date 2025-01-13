import React, { useState } from 'react'
import PropTypes from 'prop-types';

function MainImage({ selectedVariant }) {
    const [zoomStyle, setZoomStyle] = useState({
        display: 'none',
        zoomX: '0%',
        zoomY: '0%',
    });

    const handleMouseMove = (event) => {
        const zoomX = (event.nativeEvent.offsetX * 100) / event.target.offsetWidth;
        const zoomY = (event.nativeEvent.offsetY * 100) / event.target.offsetHeight;
        setZoomStyle({
            display: 'block',
            zoomX: `${zoomX}%`,
            zoomY: `${zoomY}%`,
        });
    };

    const handleMouseOut = () => {
        setZoomStyle({
            display: 'none',
            zoomX: '0%',
            zoomY: '0%',
        });
    };

    return (
        <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
        >
            <img src={selectedVariant?.coverImg || selectedVariant?.images?.[0]} />
            <div
                style={{
                    display: zoomStyle.display,
                    backgroundImage: `url(${selectedVariant?.coverImg})`,
                    backgroundSize: '200%',
                    backgroundPosition: `${zoomStyle.zoomX} ${zoomStyle.zoomY}`,
                }}
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    )
}

MainImage.propTypes = {
    selectedVariant: PropTypes.object,
}

export default MainImage