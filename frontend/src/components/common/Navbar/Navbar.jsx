import React, { useEffect, useState } from 'react';
import Headroom from 'react-headroom'
import TopNavBar from './TopNavBar';
import Header from './Header';

const Navbar = () => {
    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    }

    const [width, setWidth] = React.useState(window.innerWidth);
    const debouncedWidth = useDebounce(width, 300);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <TopNavBar />
            {
                debouncedWidth > 780 ?
                    <Headroom
                        upTolerance={10}
                        downTolerance={10}
                        scrolledClassName="transition-all ease-in duration-300 transform opacity-100"
                        unscrolledClassName="transition-all ease-out duration-300 transform opacity-0 translate-y-[-100%]"
                        style={{ zIndex: '10' }}
                    >
                        <Header />
                    </Headroom>
                    :
                    <Header />
            }
        </>
    );
}

export default Navbar;
