import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel';
import Images from '../../constants/imageConstant';
import TextOnImage from '../TextOnImage';
import CategoryList from './CategoryList';
import { Link } from "react-router";
import { useQuery } from '@tanstack/react-query';
import { getClassicProducts } from '../../services/productApi';
import Loader from '../Loader/Loader';

function HomeBody() {

    const [pegasus, setPegasus] = useState([]);
    const [airJordan, setAirJordan] = useState([]);
    const [airForce, setAirForce] = useState([]);
    const [dunks, setDunks] = useState([]);
    const [vaporFly, setVaporFly] = useState([]);
    const [vomero, setVomero] = useState([]);

    const { isLoading, data: classicProducts } = useQuery({
        queryKey: ['classicPoducts'],
        queryFn: getClassicProducts
    })

    console.log(classicProducts)

    useEffect(() => {
        if (classicProducts) {
            const filteredPegasus = classicProducts.find(product => product.title === "Nike Pegasus 41");
            setPegasus(filteredPegasus);
            const filterAirJordans = classicProducts.find(product => product.title === 'Air Jordan 1 Low');
            setAirJordan(filterAirJordans);
            const filteredAirForce = classicProducts.find(product => product.title === "Nike Air Force 1 '07");
            setAirForce(filteredAirForce);
            const filterDunks = classicProducts.find(product => product.title === 'Nike Dunk Low Retro');
            setDunks(filterDunks);
            const filterVaporFly = classicProducts.find(product => product.title === 'Nike Vaporfly 3');
            setVaporFly(filterVaporFly);
            const filterVomero = classicProducts.find(product => product.title === 'Nike Zoom Vomero');
            setVomero(filterVomero);
        }
    }, [classicProducts])


    return (
        <>
            {
                isLoading ?
                    <Loader /> :

                    <main className='w-full md:px-10 px-6'>
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

                        <section className='classics-section mb-14'>
                            <h2 className='section-heading'>Classics Spotlight</h2>
                            <Carousel
                                items={[{ data: pegasus, image: Images?.Shoe1 }, { data: airJordan, image: Images?.Shoe2 }, { data: airForce, image: Images?.Shoe3 }, { data: dunks, image: Images?.Shoe4 }, { data: vaporFly, image: Images?.Shoe5 }, { data: vomero, image: Images?.Shoe6 }]}
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

                        <section className='essentials-section mb-14'>
                            <h2 className='section-heading'>The Essentials</h2>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "?gender=men",
                                    }}
                                >
                                    <TextOnImage item={{ image: Images.MensImg, text: "Men's" }} ImgClass='w-full' />
                                </Link>
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "?gender=women",
                                    }}
                                >
                                    <TextOnImage item={{ image: Images.WomensImg, text: "Women's" }} ImgClass='w-full' />
                                </Link>
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "?isKids=true",
                                    }}
                                >
                                    <TextOnImage item={{ image: Images.KidsImg, text: "Kid's" }} ImgClass='w-full' />
                                </Link>
                            </div>
                        </section>

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

                        <section className='shop-by-sports mb-14'>
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
                                    600: {
                                        slidesPerView: 2
                                    },
                                    0: {
                                        slidesPerView: 1
                                    }
                                }}
                            />
                        </section>

                        <section className='categories-section mb-14'>
                            <div className='grid grid-cols-1 gap-0 xl:px-60 lg:grid-cols-4 lg:gap-10 lg:px-24
                     md:grid-cols-4 md:gap-4'>
                                <CategoryList title='Icons' items={['Air Force 1', 'Huarache', 'Air Max 90', 'Air Max 95', 'Air Max 97', 'Air Max 270', 'Air Max 720', 'All Air Max']} />
                                <CategoryList title='Shoes' items={['All Shoes', 'Custom Shoes', 'Jordan Shoes', 'Running Shoes', 'Basketball Shoes', 'Football Shoes', 'Gym & Training Shoes', 'Lifestyle Shoes']} />
                                <CategoryList title='Clothing' items={['All Clothing', 'Modest Wear', 'Hoodies & Pullovers', 'Shirts & Tops', 'Jackets', 'Compression & Nike Pro', 'Trousers & Leggings', 'Shorts']} />
                                <CategoryList title="Kids'" items={['Infant & Toddler Shoes', "Kids' Shoes", "Kids' Jordan Shoes", "Kids' Basketball Shoes", "Kids' Running Shoes", "Kids' Clothing", "Kids' Backpacks", "Kids' Socks"]} />
                            </div>
                        </section>
                    </main>

            }
        </>
    )
}

export default HomeBody