import React from 'react'
import { Link } from 'react-router-dom'
import Images from '../../constants/imageConstant'

function Banner() {
    return (
        <section className='banner-section mb-14 cursor-pointer'>
            <Link
                to={{
                    pathname: "/products",
                    search: "?sport=lifestyle",
                }}
            >
                <img src={Images?.BannerImg} alt="banner img" className='md:block hidden' />
                <img src={Images?.BannerImgMobile} alt="banner img" className='w-full md:hidden block' />

                <div className='text-start sm:text-center mt-2'>
                    <h1 className='section-title'>Nike Tech Woven Suit</h1>
                    <p className='mt-1'>Engineered to unlock your range of motion.</p>
                    <button className='black-btn mt-5'>Shop Now</button>
                </div>
            </Link>
        </section>
    )
}

export default Banner