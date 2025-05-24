import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getClassicProducts } from '../services/productApi'
import Loader from '../components/Loader/Loader'
import Banner from '../components/Home/Banner'
import ClassicProducts from '../components/Home/ClassicProducts'
import Essentials from '../components/Home/Essentials'
import Trending from '../components/Home/Trending'
import ShopBySports from '../components/Home/ShopBySports'
import Category from '../components/Home/Category'

function Home() {

    const { isLoading, data: classicProducts } = useQuery({
        queryKey: ['classicPoducts'],
        queryFn: getClassicProducts
    })

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <main className='w-full md:px-10 px-6'>
                        <Banner />
                        <ClassicProducts classicProducts={classicProducts} />
                        <Essentials />
                        <Trending />
                        <ShopBySports />
                        {/* <Category /> */}
                    </main>
            }
        </>

    )
}

export default Home