import React from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css'

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel({ items }) {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            allowTouchMove={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                780: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            }}
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>
                    <img src={item} alt="shoes" className='h-72 w-full' loading="lazy" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
