import React, { useEffect } from 'react'
import Carousel from '../Carousel/Carousel';
import Images from '../../constants/imageConstant';

function Header() {

    const [width, setWidth] = React.useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header>
            <div className='w-full md:px-10 px-6'>
                <section className='banner-section mb-14'>
                    {
                        width > 600 ?
                            <img src={Images?.BannerImg} alt="banner img" /> :
                            <img src={Images?.BannerImgMobile} alt="banner img" />
                    }
                    <div className='text-start sm:text-center mt-2'>
                        <h1 className='section-title'>Nike Tech Woven Suit</h1>
                        <p className='mt-1'>Engineered to unlock your range of motion.</p>
                        <button className='black-btn mt-5'>Shop Now</button>
                    </div>
                </section>
                <section className='classics-section mb-14'>
                    <h2 className='section-heading'>Classics Spotlight</h2>
                    <Carousel
                        items={[{ image: Images?.Shoe1 }, { image: Images?.Shoe2 }, { image: Images?.Shoe3 }, { image: Images?.Shoe4 }, { image: Images?.Shoe5 }, { image: Images?.Shoe6 }]}
                        slidesPerView={4}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            1200: {
                                slidesPerView: 4
                            },
                            780: {
                                slidesPerView: 3
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
                <section className='trending-section mb-14'>
                    <h2 className='section-heading'>Trending</h2>
                    {
                        width > 600 ?
                            <img src={Images?.TrendingImg} alt="trending img" /> :
                            <img src={Images?.TrendingImgMobile} alt="trending img" />
                    }
                    <div className='text-start sm:text-center mt-2'>
                        <p className='mt-1'>Women’s Jordan Plaid Pack</p>
                        <h1 className='section-title'>FOR THE HOME TEAM</h1>
                        <p className='mt-1'>New prints. No rules. Set your fits apart in plaid that keeps you cozy from head to toe.</p>
                        <button className='black-btn mt-5'>Shop Now</button>
                    </div>
                </section>
                <section className='shop-by-sports'>
                    <h2 className='section-heading'>Shop By Sport</h2>
                    <Carousel
                        items={[{ image: Images?.RunningImg, text: 'Running' }, { image: Images?.FootBallImg, text: 'Football' }, { image: Images?.BasketBallImg, text: 'Basketball' }, { image: Images?.GymTrainingImg, text: 'Training and Gym' }, { image: Images?.TennisImg, text: 'Tennis' }, { image: Images?.YogaImg, text: 'Yoga' }, { image: Images?.SkateBoardImg, text: 'Skateboarding' }, { image: Images?.DanceImg, text: 'Dance' }]}
                        slidesPerView={3}
                        spaceBetween={10}
                        loop={false}
                        autoplay={false}
                        breakpoints={{
                            1200: {
                                slidesPerView: 3
                            },
                            780: {
                                slidesPerView: 2
                            },
                            0: {
                                slidesPerView: 1
                            }
                        }}
                    />
                </section>
            </div>
        </header>
    )
}

export default Header