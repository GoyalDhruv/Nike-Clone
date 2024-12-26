import { categoryFilter, clothesSizeFilter, colorFilter, genderFilter, kidsFilter, shoeSizeFilter, sportsFilter } from '../../constants/filterData';
import { useState } from 'react';
import CustomDisclosure from '../Disclosure/CustomDisclosure';
import PropTypes from 'prop-types';
import { useFilterContext } from '../../contexts/filterContext';

function FilterSection(
) {

    const {
        selectedCategory, setSelectedCategory, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes,
        selectedGenders, setSelectedGenders, selectedSports, setSelectedSports, selectedKidSection, setSelectedKidSection
    } = useFilterContext();

    const handleColorToggle = (color) => {
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(color)) {
                return prevSelectedColors.filter((item) => item !== color);
            } else {
                return [...prevSelectedColors, color];
            }
        });
    };

    const handleSizeToggle = (size) => {
        setSelectedSizes((prev) => {
            if (prev.includes(size)) {
                return prev.filter((s) => s !== size);
            } else {
                return [...prev, size];
            }
        });
    };

    const handleGenderToggle = (gender) => {
        setSelectedGenders((prevSelectedGenders) => {
            if (prevSelectedGenders.includes(gender)) {
                return prevSelectedGenders.filter((item) => item !== gender);
            } else {
                return [...prevSelectedGenders, gender];
            }
        });
    };

    const handleSportsToggle = (sport) => {
        setSelectedSports((prevSelectedSports) => {
            if (prevSelectedSports.includes(sport)) {
                return prevSelectedSports.filter((item) => item !== sport);
            } else {
                return [...prevSelectedSports, sport];
            }
        });
    };

    const handleKidsSection = (kid) => {
        setSelectedKidSection((prevSelectedKidsSection) => {
            if (prevSelectedKidsSection.includes(kid)) {
                return prevSelectedKidsSection.filter((item) => item !== kid);
            } else {
                return [...prevSelectedKidsSection, kid];
            }
        });
    }

    return (
        <>
            {/* Color Filter */}
            <CustomDisclosure
                title={'Color'}
                disclosureBody={
                    <div className="grid grid-cols-3 gap-3">
                        {colorFilter.map((option, index) => (
                            <div key={option.value} className="flex items-center flex-col">
                                <div className="group grid grid-cols-1">
                                    <input
                                        id={`filter-color-${index}`}
                                        type="checkbox"
                                        checked={selectedColors.includes(option.value)}
                                        onChange={() => handleColorToggle(option.value)}
                                        className="hidden"
                                    />
                                    <div
                                        className={` w-6 h-6 rounded-full border cursor-pointer relative`}
                                        style={{ backgroundColor: `${option.value}` }}
                                        onClick={() => handleColorToggle(option.value)}
                                    >
                                        {selectedColors.includes(option.value) && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${option.value === 'white' ? 'text-black' : 'text-white'}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.293 5.293a1 1 0 0 1 0 1.414L8 14.414 3.707 10.707a1 1 0 1 1 1.414-1.414L8 11.586l6.293-6.293a1 1 0 0 1 1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <label
                                    htmlFor={`filter-color-${index}`}
                                    className="text-xs font-medium"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                }
            />

            {/* Size Filter */}
            {
                selectedCategory === 'shoes' ?
                    <CustomDisclosure
                        title={'Size'}
                        disclosureBody={
                            <div className="grid lg:grid-cols-3 sm:grid-cols-6 grid-cols-4 gap-3">
                                {shoeSizeFilter.map((option, index) => (
                                    <div
                                        key={option.value}
                                        className={`py-1 rounded-md text-center border ${selectedSizes.includes(option.value) ? 'border-black ' : 'border-[#E5E5E5]'} hover:border-black transition-all duration-300`}
                                        onClick={() => handleSizeToggle(option.value)}
                                    >
                                        <input
                                            value={option.value}
                                            checked={selectedSizes.includes(option.value)}
                                            onChange={() => handleSizeToggle(option.value)}
                                            id={`filter-size-${index}`}
                                            type="checkbox"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`filter-size-${index}`}
                                            className="text-md font-medium w-full"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    :
                    <CustomDisclosure
                        title={'Size'}
                        disclosureBody={
                            <div className="grid lg:grid-cols-2 grid-cols-3 gap-3">
                                {clothesSizeFilter.map((option, index) => (
                                    <div
                                        key={option.value}
                                        className={`py-1 rounded-md text-center border ${selectedSizes.includes(option.value) ? 'border-black ' : 'border-[#E5E5E5]'} hover:border-black transition-all duration-300`}
                                        onClick={() => handleSizeToggle(option.value)}
                                    >
                                        <input
                                            value={option.value}
                                            checked={selectedSizes.includes(option.value)}
                                            onChange={() => handleSizeToggle(option.value)}
                                            id={`filter-size-${index}`}
                                            type="checkbox"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`filter-size-${index}`}
                                            className="text-md font-medium w-full"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        }
                    />
            }

            {/* Gender Filter */}
            <CustomDisclosure
                title={'Gender'}
                disclosureBody={
                    <div className="grid grid-cols-1 gap-2">
                        {genderFilter.map((option, index) => (
                            <div key={option.value} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedGenders.includes(option.value)}
                                    onChange={() => handleGenderToggle(option.value)}
                                    className="w-5 h-5 rounded border-gray-300 checked:accent-black"
                                />
                                <label htmlFor={`filter-gender-${index}`} className="text-md font-medium">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                }
            />

            {/* Sports Filter */}
            <CustomDisclosure
                title={'Sports'}
                disclosureBody={
                    <div className="grid lg:grid-cols-1 grid-cols-2 gap-2">
                        {sportsFilter.map((option, index) => (
                            <div key={option.value} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedSports.includes(option.value)}
                                    onChange={() => handleSportsToggle(option.value)}
                                    className="w-5 h-5 rounded border-gray-300 checked:accent-black"
                                />
                                <label htmlFor={`filter-sports-${index}`} className="text-md font-medium">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                }
            />

            {/* Kids Filter */}
            <CustomDisclosure
                title={'Kids'}
                disclosureBody={
                    <div className="grid lg:grid-cols-1 grid-cols-2 gap-2">
                        {kidsFilter.map((option, index) => (
                            <div key={option.value} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedKidSection.includes(option.value)}
                                    onChange={() => handleKidsSection(option.value)}
                                    className="w-5 h-5 rounded border-gray-300 checked:accent-black"
                                />
                                <label htmlFor={`filter-sports-${index}`} className="text-md font-medium">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                }
            />

            <CustomDisclosure
                title={'Category'}
                disclosureBody={
                    <div className="grid lg:grid-cols-1 grid-cols-2 gap-2">
                        {categoryFilter.map((option, index) => (
                            <div key={option.value} className="flex gap-2 items-center">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === option.value}
                                    onChange={() => setSelectedCategory(option.value)}
                                    className="w-5 h-5 rounded border-gray-300 checked:accent-black"
                                />
                                <label htmlFor={`filter-sports-${index}`} className="text-md font-medium">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                }
            />
        </>
    );
}

export default FilterSection;
