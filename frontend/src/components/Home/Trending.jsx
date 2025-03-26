import React from 'react'
import { Link } from 'react-router-dom'
import Images from '../../constants/imageConstant'

function Trending() {
    return (
        <section className='trending-section mb-14'>
            <Link
                to={{
                    pathname: "/products",
                    search: "?status=trending",
                }}
            >
                <h2 className='section-heading'>Trending</h2>

                <img src={Images?.TrendingImg} alt="trending img" className='md:block hidden' />
                <img src={Images?.TrendingImgMobile} alt="trending img" className='w-full md:hidden block' />

                <div className='text-start sm:text-center mt-2'>
                    <p className='mt-1'>Women’s Jordan Plaid Pack</p>
                    <h1 className='section-title'>FOR THE HOME TEAM</h1>
                    <p className='mt-1'>New prints. No rules. Set your fits apart in plaid that keeps you cozy from head to toe.</p>
                    <button className='black-btn mt-5'>Shop Now</button>
                </div>
            </Link>
        </section>
    )
}

export default Trending