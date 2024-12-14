import React, { useEffect } from 'react'
import BannerImg from '../../assets/images/bannerImg.jpg'
import BannerImgMobile from '../../assets/images/bannerImgMobile.png'
import Carousel from '../Carousel/Carousel';
import Shoe1 from '../../assets/images/shoe1.png'
import Shoe2 from '../../assets/images/shoe2.png'
import Shoe3 from '../../assets/images/shoe3.jpg'
import Shoe4 from '../../assets/images/shoe4.png'
import Shoe5 from '../../assets/images/shoe5.png'
import Shoe6 from '../../assets/images/shoe6.png'
import TrendingImg from '../../assets/images/trending1.jpg'
import TrendingImgMobile from '../../assets/images/trending2.jpg'


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
                            <img src={BannerImg} alt="banner img" /> :
                            <img src={BannerImgMobile} alt="banner img" />
                    }
                    <div className='text-start sm:text-center mt-2'>
                        <h1 className='section-title'>Nike Tech Woven Suit</h1>
                        <p className='mt-1'>Engineered to unlock your range of motion.</p>
                        <button className='black-btn mt-5'>Shop Now</button>
                    </div>
                </section>
                <section className='classics-section mb-14'>
                    <h2 className='section-heading'>Classics Spotlight</h2>
                    <Carousel items={[Shoe1, Shoe2, Shoe3, Shoe4, Shoe5, Shoe6]} />
                </section>
                <section className='trending-section mb-14'>
                    <h2 className='section-heading'>Trending</h2>
                    {
                        width > 600 ?
                            <img src={TrendingImg} alt="trending img" /> :
                            <img src={TrendingImgMobile} alt="trending img" />
                    }
                    <div className='text-start sm:text-center mt-2'>
                        <p className='mt-1'>Women’s Jordan Plaid Pack</p>
                        <h1 className='section-title'>FOR THE HOME TEAM</h1>
                        <p className='mt-1'>New prints. No rules. Set your fits apart in plaid that keeps you cozy from head to toe.</p>
                        <button className='black-btn mt-5'>Shop Now</button>
                    </div>
                </section>
            </div>
        </header>
    )
}

export default Header