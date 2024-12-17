import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const MobileNavbarContext = createContext();

export const useMobileNavbar = () => useContext(MobileNavbarContext);

export const MobileNavbarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MobileNavbarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </MobileNavbarContext.Provider>
    );
};

MobileNavbarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};