import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css'

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel({ items, slidesPerView, spaceBetween, loop, autoplay, breakpoints }) {

    const doesItIncludeText = items.some(item => item.text)

    const swiperRef = useRef(null);

    useEffect(() => {
        const swiper = swiperRef.current.swiper;
        swiper.on('slideChange', swiper.isBeginning);
        return () => {
            swiper.off('slideChange', swiper.isBeginning);
        };
    }, []);

    return (
        <Swiper
            ref={swiperRef}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            loop={loop}
            allowTouchMove={true}
            autoplay={autoplay}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={breakpoints}
        >
            {!doesItIncludeText ?

                items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.image} alt="shoes" className='h-72 w-full cursor-pointer' loading="lazy" />
                    </SwiperSlide>
                ))
                :
                items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='relative cursor-pointer'>
                            <img src={item.image} alt="shoes" loading="lazy" />
                            <p className='black-btn absolute z-100 bottom-6 left-6'>{item?.text}</p>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}

Carousel.propTypes = {
    items: PropTypes.array.isRequired,
    slidesPerView: PropTypes.number,
    spaceBetween: PropTypes.number,
    loop: PropTypes.bool,
    autoplay: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    breakpoints: PropTypes.object
};

export default Carousel;