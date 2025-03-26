import React from 'react'
import Carousel from '../Carousel/Carousel'
import Images from '../../constants/imageConstant'

function ShopBySports() {
    return (
        <section className='shop-by-sports mb-14'>
            <h2 className='section-heading'>Shop By Sport</h2>
            <Carousel
                items={[
                    { image: Images?.RunningImg, text: 'Running' },
                    { image: Images?.FootBallImg, text: 'Football' },
                    { image: Images?.BasketBallImg, text: 'Basketball' },
                    { image: Images?.GymTrainingImg, text: 'Training and Gym' },
                    { image: Images?.TennisImg, text: 'Tennis' },
                    { image: Images?.YogaImg, text: 'Yoga' },
                    { image: Images?.SkateBoardImg, text: 'Skateboarding' },
                    { image: Images?.DanceImg, text: 'Dance' }
                ]}
                slidesPerView={3}
                spaceBetween={10}
                loop={false}
                autoplay={false}
                breakpoints={{
                    1200: {
                        slidesPerView: 3
                    },
                    600: {
                        slidesPerView: 2
                    },
                    0: {
                        slidesPerView: 1
                    }
                }}
            />
        </section>
    )
}

export default ShopBySports