import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useFilterContext } from '../../../contexts/filterContext';

const DropdownMenu = ({ menuTitle, subTitle, items, isNavBar }) => {

    const { selectedSort, setSelectedSort } = useFilterContext()

    return (
        <Menu as="div" className={`relative ${isNavBar && 'z-20'}`}>
            <MenuButton className='focus:outline-none'>
                {menuTitle}
            </MenuButton>
            <MenuItems
                className="absolute right-0 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 opacity-100 scale-100 transition-all ease-out duration-200"
            >
                <div className={`px-5 ${subTitle ? "py-1" : "py-3"}`}>
                    {subTitle &&
                        <MenuItem>
                            <p className="pt-2 pb-3 font-semibold text-md text-black">
                                {subTitle}
                            </p>
                        </MenuItem>
                    }
                    {items.map((item, index) => (
                        <MenuItem key={index}>
                            <div
                                // href={item.href || '#'}
                                className={`block pb-2 font-medium text-xs cursor-pointer ${item?.label === selectedSort?.label ? 'text-black' : 'text-textPrimary'} hover:text-black`}
                                onClick={() => setSelectedSort(item)}
                            >
                                {item.label}
                            </div>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu >
    );
};

DropdownMenu.propTypes = {
    menuTitle: PropTypes.object.isRequired,
    subTitle: PropTypes.string,
    items: PropTypes.array.isRequired,
    isNavBar: PropTypes.bool,
}

export default DropdownMenu;
