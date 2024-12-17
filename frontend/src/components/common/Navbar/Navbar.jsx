import React from 'react';
import Headroom from 'react-headroom'
import TopNavBar from './TopNavBar';
import Header from './Header';
import { useMobileNavbar } from '../../../contexts/MobileNavbar';

const Navbar = () => {
    const { isOpen } = useMobileNavbar();

    return (
        <>
            <TopNavBar />
            {
                isOpen ? (
                    <Header />
                ) : (
                    <Headroom
                        upTolerance={0}
                        downTolerance={10}
                        scrolledclassname="opacity-100 transform translate-y-0 transition-all ease-in-out duration-500"
                        unscrolledclassname="opacity-0 transform -translate-y-full transition-all ease-in-out duration-500"
                        style={{ zIndex: '10' }}
                    >
                        <Header />
                    </Headroom>
                )
            }
        </>
    );
}

export default Navbar;
