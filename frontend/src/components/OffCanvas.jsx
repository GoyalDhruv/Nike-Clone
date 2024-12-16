import React from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import Images from '../constants/imageConstant';


const OffCanvas = ({ isOpen, setIsOpen }) => {

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Transition
                show={isOpen}
                enter="transition-opacity duration-180"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="transition-opacity duration-180"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-[#1111115c] z-10"
                    onClick={toggleSidebar}
                />
            </Transition>

            <Transition
                show={isOpen}
                enter="transition-transform duration-180 ease-linear"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-180 ease-linear"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="fixed top-0 right-0 z-20 bg-white w-80 sm:w-96 h-full">
                    <div className="flex justify-end pt-6 pe-6">
                        <div onClick={toggleSidebar}>
                            <img src={Images.Close} alt="close" className='w-6 h-6' />
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

OffCanvas.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default OffCanvas;
