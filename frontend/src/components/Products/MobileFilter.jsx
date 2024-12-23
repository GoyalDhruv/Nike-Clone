import React, { useState } from 'react'
import CustomDialog from '../CustomDialog/Dialog'
import Images from '../../constants/imageConstant';
import FilterSection from './FilterSection';
import PropTypes from 'prop-types'
import { useFilterContext } from '../../contexts/filterContext';

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleApplyFilters, handleClearFilters }) {

    const { selectedSort, setSelectedSort } = useFilterContext();

    return (
        <CustomDialog open={mobileFiltersOpen} toggle={() => setMobileFiltersOpen(false)} bottom={true}>
            <div className='px-4 py-5'>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filter</h2>
                    <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    >
                        <img src={Images.Close} alt='Close' className="size-6" />
                    </button>
                </div>

                {/* <DropdownMenu */}
                <p className='text-lg font-semibold tracking-tight my-5'>
                    Sort By
                </p>
                <div className="space-y-3">
                    {[
                        { label: 'Featured', order: 'desc', sort: 'rating' },
                        { label: 'Newest', order: 'desc', sort: 'createdAt' },
                        { label: 'Price: Low to High', order: 'asc', sort: 'discountPrice' },
                        { label: 'Price: High to Low', order: 'desc', sort: 'discountPrice' },
                    ].map((option) => (
                        <div key={option.label} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={option.label}
                                name="filter"
                                value={option.label}
                                checked={selectedSort.label === option.label}
                                onChange={() => setSelectedSort(option)}
                                className="h-4 w-4 text-black border-gray-300 focus:ring-black accent-black"
                            />
                            <label htmlFor={option.label} className="text-black text-md font-semibold tracking-tighter">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                    <FilterSection />
                </form>
                <div className='grid grid-cols-2 gap-2'>
                    <button
                        className='bg-white text-black font-medium rounded-full px-4 py-2 border'
                        onClick={handleClearFilters}
                    >
                        Clear
                    </button>
                    <button
                        className='black-btn'
                        onClick={handleApplyFilters}
                    >
                        Apply
                    </button>

                </div>
            </div>
        </CustomDialog>
    )
}

MobileFilter.propTypes = {
    mobileFiltersOpen: PropTypes.bool.isRequired,
    setMobileFiltersOpen: PropTypes.func.isRequired,
    handleApplyFilters: PropTypes.func,
    handleClearFilters: PropTypes.func,
    toggleMobileFilter: PropTypes.func
}

export default MobileFilter