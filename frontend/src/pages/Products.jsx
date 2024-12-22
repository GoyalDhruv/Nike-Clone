import { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import CustomContainer from '../layouts/CustomContainer'
import DropdownMenu from '../components/common/Navbar/DropdownMenu'
import Images from '../constants/imageConstant'
import CategoryList from '../components/HomeBody/CategoryList';
import FilterSection from '../components/Products/FilterSection';
import MobileFilter from '../components/Products/MobileFilter';
import ProductsList from '../components/Products/ProductsList';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/productApi';
import Loader from '../components/Loader/Loader';


export default function Product() {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const [showFilters, setShowFilters] = useState(true);

    const { isLoading, isError, error, data: productData } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        retry: 3,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <>
                        {/* Mobile filter dialog */}
                        < MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />

                        <CustomContainer customClass={""}>
                            <div className="flex items-baseline justify-between border-b border-gray-200 py-12">
                                <h1 className="page-heading">New Arrivals</h1>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowFilters(prev => !prev)}
                                        className="lg:flex px-5 py-2 gap-2 items-center hidden"
                                    >
                                        {showFilters ?
                                            <span className='text-lg font-medium'>
                                                Show Filters
                                            </span> :
                                            <span className='text-lg font-medium'>
                                                Hide Filters
                                            </span>
                                        }
                                        <img src={Images.Filter} alt='filter' className='size-6' />
                                    </button>
                                    <div className='lg:block hidden'>
                                        <DropdownMenu
                                            menuTitle={<p className='inline-flex gap-1 items-center justify-center text-lg font-medium'>
                                                Sort By
                                                <FaAngleDown className="size-4" />
                                            </p>}
                                            items={[
                                                { label: 'Featured', href: '#' },
                                                { label: 'Newest', href: '#' },
                                                { label: 'Price: Low to High', href: '#' },
                                                { label: 'Price: High to Low', href: '#' },
                                            ]}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(true)}
                                        className=" lg:hidden flex border px-5 py-2 gap-1 items-center rounded-full"
                                    >
                                        <span className='font-bold'>Filters</span>
                                        <img src={Images.Filter} alt='filter' className='size-6' />
                                    </button>
                                </div>
                            </div>

                            <section className="pb-24 pt-9">
                                <div className="grid grid-cols-12 gap-x-8 gap-y-10">
                                    {/* Filters */}
                                    <div className={`transition-all lg:col-span-2 duration-500 ease-in-out transform ${showFilters ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                                        {showFilters &&
                                            <div className=" hidden lg:block">
                                                <CategoryList items={['Totes', 'Backpacks', 'Travel Bags', 'Hip Bags', 'Laptop Sleeves']} listClass='font-semibold text-md tracking-tight' />

                                                <div className='mt-8'>
                                                    <FilterSection />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {/* Product grid */}
                                    <ProductsList showFilters={showFilters} data={productData} />
                                </div>
                            </section>
                        </CustomContainer>
                    </>
            }
        </>
    )
}
