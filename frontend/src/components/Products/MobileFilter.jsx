import React, { useState } from 'react'
import CustomDialog from '../CustomDialog/Dialog'
import Images from '../../constants/imageConstant';
import FilterSection from './FilterSection';
import PropTypes from 'prop-types'

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen }) {
    const toggleMobileFilter = () => {
        setMobileFiltersOpen(!mobileFiltersOpen)
    }
    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <CustomDialog open={mobileFiltersOpen} toggle={toggleMobileFilter} bottom={true}>
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
                        { label: 'Featured', value: 'Featured' },
                        { label: 'Newest', value: 'Newest' },
                        { label: 'Price: Low to High', value: 'Price: Low to High' },
                        { label: 'Price: High to Low', value: 'Price: High to Low' },
                    ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={option.value}
                                name="filter"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={handleRadioChange}
                                className="h-4 w-4 text-black border-gray-300 focus:ring-black accent-black"
                            />
                            <label htmlFor={option.value} className="text-black text-md font-semibold tracking-tighter">
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
                    <button className='bg-white text-black font-medium rounded-full px-4 py-2 border'>Clear</button>
                    <button className='black-btn'>Apply</button>

                </div>
            </div>
        </CustomDialog>
    )
}

MobileFilter.propTypes = {
    mobileFiltersOpen: PropTypes.bool.isRequired,
    setMobileFiltersOpen: PropTypes.func.isRequired,
}

export default MobileFilter