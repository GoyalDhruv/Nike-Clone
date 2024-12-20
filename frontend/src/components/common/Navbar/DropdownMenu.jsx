import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import PropTypes from 'prop-types';

const DropdownMenu = ({ menuTitle, subTitle, items }) => {
    return (
        <Menu as="div" className='relative z-20'>
            <MenuButton className='focus:outline-none'>
                {menuTitle}
            </MenuButton>
            <MenuItems
                className="absolute right-0 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 opacity-100 scale-100 transition-all ease-out duration-200"
            >
                <div className="py-1 px-5">
                    <MenuItem>
                        <p className="pt-2 pb-3 font-semibold text-md text-black hover:text-textPrimary">
                            {subTitle}
                        </p>
                    </MenuItem>
                    {items.map((item, index) => (
                        <MenuItem key={index}>
                            {({ active }) => (
                                <a
                                    href={item.href || '#'}
                                    className={`block pb-2 font-medium text-xs ${active ? 'text-black' : 'text-textPrimary'
                                        } hover:text-black`}
                                >
                                    {item.label}
                                </a>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
};

DropdownMenu.propTypes = {
    menuTitle: PropTypes.object.isRequired,
    subTitle: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string
    })).isRequired,
}

export default DropdownMenu;
