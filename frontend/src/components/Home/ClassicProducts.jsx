import React from 'react'
import Carousel from '../Carousel/Carousel'
import PropTypes from 'prop-types';
import Images from '../../constants/imageConstant';

function ClassicProducts({ classicProducts }) {
    return (
        <section className='classics-section mb-14'>
            <h2 className='section-heading'>Classics Spotlight</h2>
            <Carousel
                items={[
                    { data: classicProducts?.find(product => product.title === "Nike Pegasus 41"), image: Images?.Shoe1 },
                    { data: classicProducts?.find(product => product.title === 'Air Jordan 1 Low'), image: Images?.Shoe2 },
                    { data: classicProducts?.find(product => product.title === "Nike Air Force 1 '07"), image: Images?.Shoe3 },
                    { data: classicProducts?.find(product => product.title === 'Nike Dunk Low Retro'), image: Images?.Shoe4 },
                    { data: classicProducts?.find(product => product.title === 'Nike Vaporfly 3'), image: Images?.Shoe5 },
                    { data: classicProducts?.find(product => product.title === 'Nike Zoom Vomero'), image: Images?.Shoe6 }
                ]}
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20,
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
            />
        </section>
    )
}

ClassicProducts.propTypes = {
    classicProducts: PropTypes.array
}

export default ClassicProducts