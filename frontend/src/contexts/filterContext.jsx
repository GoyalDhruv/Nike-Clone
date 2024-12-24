import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const FilterContext = createContext()

export const useFilterContext = () => useContext(FilterContext)

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);
    const [selectedKidSection, setSelectedKidSection] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedSort, setSelectedSort] = useState({
        label: 'Featured',
        order: 'desc',
        sort: 'rating',
    });

    return (
        <FilterContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            selectedColors,
            setSelectedColors,
            selectedSizes,
            setSelectedSizes,
            selectedGenders,
            setSelectedGenders,
            selectedSports,
            setSelectedSports,
            selectedKidSection,
            setSelectedKidSection,
            selectedStatus,
            setSelectedStatus,
            selectedSort,
            setSelectedSort,
        }}>
            {children}
        </FilterContext.Provider>
    )
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
}