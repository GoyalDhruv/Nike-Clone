import { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import CustomContainer from '../layouts/CustomContainer'
import DropdownMenu from '../components/common/Navbar/DropdownMenu'
import Images from '../constants/imageConstant'
import CategoryList from '../components/Home/CategoryList';
import FilterSection from '../components/Products/FilterSection';
import MobileFilter from '../components/Products/MobileFilter';
import ProductsList from '../components/Products/ProductsList';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/productApi';
import Loader from '../components/Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFilterContext } from '../contexts/filterContext';
import { RiResetLeftLine } from "react-icons/ri";
import Pagination from '../components/Pagination/Pagination'


export default function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const [shouldFetch, setShouldFetch] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4

    const {
        selectedCategory, setSelectedCategory, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes,
        selectedGenders, setSelectedGenders, selectedSports, setSelectedSports, selectedKidSection, setSelectedKidSection, selectedStatus, setSelectedStatus, selectedSort, setSelectedSort
    } = useFilterContext();

    useEffect(() => {
        if (mobileFiltersOpen) {
            setShouldFetch(false);
        }
    }, [mobileFiltersOpen]);

    useEffect(() => {
        changeParams()
    }, [location.search]);

    useEffect(() => {
        handleFilterChange();
    }, [selectedCategory, selectedColors, selectedSizes, selectedGenders, selectedSports, selectedKidSection, selectedStatus, selectedSort]);

    const changeParams = () => {
        const category = queryParams.get('category') || 'shoes';
        const status = queryParams.get('status')
        const colors = queryParams.get('colors')?.split(',') || [];
        const sizes = queryParams.get('sizes')?.split(',') || [];
        const genders = queryParams.get('gender')?.split(',') || [];
        const sports = queryParams.get('sports')?.split(',') || [];

        let kids = []
        if (queryParams.get('isKids')) {
            kids = ['girls', 'boys'];
        }

        const sort = queryParams.get('sort') || 'rating';
        const order = queryParams.get('order') || 'desc';
        const label = queryParams.get('label') || 'Featured';

        setSelectedCategory(category);
        setSelectedColors(colors);
        setSelectedSizes(sizes);
        setSelectedGenders(genders);
        setSelectedSports(sports);
        setSelectedKidSection(kids);
        setSelectedStatus(status)
        setSelectedSort({ label, order, sort });
        if (!mobileFiltersOpen) {
            setShouldFetch(true)
        }
    }

    const handleFilterChange = () => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedColors.length) params.set('colors', selectedColors.join(','));
        if (selectedSizes.length) params.set('sizes', selectedSizes.join(','));
        if (selectedGenders.length) params.set('gender', selectedGenders.join(','));
        if (selectedSports.length) params.set('sports', selectedSports.join(','));
        if (selectedKidSection.length) params.set('isKids', true);
        if (selectedStatus) params.set('status', selectedStatus);
        navigate(`?${params.toString()}`);
    };

    const { isLoading, data: productData } = useQuery({
        queryKey: [
            'products',
            {
                selectedCategory,
                selectedColors,
                selectedSizes,
                selectedGenders,
                selectedSports,
                selectedKidSection,
                selectedSort,
                selectedStatus,
                currentPage,
                limit,
            },
        ],
        keepPreviousData: true,
        queryFn: getAllProducts,
        enabled: shouldFetch
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleApplyFilters = () => {
        setShouldFetch(true);
        setMobileFiltersOpen(!mobileFiltersOpen)
    };

    const handleClearFilters = () => {
        setSelectedCategory('shoes');
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedGenders([]);
        setSelectedSports([]);
        setSelectedKidSection([]);
        setSelectedStatus(null);
        setSelectedSort({ label: 'Featured', order: 'desc', sort: 'rating' });
    };

    const getHeading = (queryParams) => {
        if (queryParams?.get('status')) {
            switch (queryParams.get('status')) {
                case 'discount':
                case 'Discounted':
                    return 'Discounted';
                case 'Classics':
                case 'classics':
                    return 'Classics';
                case 'Trending':
                case 'trending':
                    return 'Trending';
                case 'Bestseller':
                    return 'Best Selling';
            }
        }
        else if (queryParams.get('category')) {
            switch (queryParams.get('category')) {
                case 'clothes':
                    return 'Clothing';
                case 'shoes':
                    return 'Shoes';
            }
        }
    }

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <>
                        {/* Mobile filter dialog */}
                        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleApplyFilters={handleApplyFilters} handleClearFilters={handleClearFilters} />

                        <CustomContainer customClass={""}>
                            <div className="flex items-baseline justify-between border-b border-gray-200 py-12">
                                <h1 className="page-heading">
                                    {getHeading(queryParams)}</h1>

                                <div className="flex items-center gap-3">
                                    {queryParams?.size > 1 &&
                                        <button
                                            type="button"
                                            onClick={() => handleClearFilters()}
                                            className="lg:flex py-2 gap-2 items-center hidden"
                                        >
                                            <span className='text-lg font-medium'>
                                                Reset Filters
                                            </span>
                                            <RiResetLeftLine className='size-5' />
                                        </button>
                                    }
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
                                                { label: 'Featured', order: 'desc', sort: 'rating' },
                                                { label: 'Newest', order: 'desc', sort: 'createdAt' },
                                                { label: 'Price: Low to High', order: 'asc', sort: 'discountPrice' },
                                                { label: 'Price: High to Low', order: 'desc', sort: 'discountPrice' },
                                            ]}
                                            isProduct={true}
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

                            <section className="pb-16 pt-9">
                                <div className="grid grid-cols-12 gap-x-8 gap-y-10">
                                    {/* Filters */}
                                    <div className={`transition-all lg:col-span-2 duration-500 ease-in-out transform ${showFilters ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                                        {showFilters &&
                                            <div className=" hidden lg:block">
                                                <CategoryList items={['Discounted', 'Trending', 'Classics', 'Bestseller']} listClass='font-semibold text-md tracking-tight'
                                                    setSelectedStatus={setSelectedStatus} />

                                                <div className='mt-8'>
                                                    <FilterSection />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {/* Product grid */}
                                    {productData && productData?.products?.length > 0 ?
                                        <>
                                            <ProductsList showFilters={showFilters} data={productData.products} />
                                            {productData.pagination.totalPages >= 1 && (
                                                <div className="col-span-12 bg-white z-50 rounded-2xl">
                                                    <Pagination
                                                        currentPage={productData.pagination.currentPage}
                                                        totalPages={productData.pagination.totalPages}
                                                        onPageChange={handlePageChange}
                                                        limit={limit}
                                                    />
                                                </div>
                                            )}
                                        </>
                                        :
                                        <div className={`col-span-12 ${showFilters ? "lg:col-span-10" : "lg:col-span-12"} text-3xl font-bold text-textSecondary flex justify-center items-center`}>
                                            No Products Found
                                        </div>
                                    }
                                </div>
                            </section>
                        </CustomContainer>
                    </>
            }
        </>
    )
}
