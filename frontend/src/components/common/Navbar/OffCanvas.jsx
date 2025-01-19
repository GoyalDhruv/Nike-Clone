import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Images from '../../../constants/imageConstant';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import CustomDialog from '../../CustomDialog/Dialog';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../../utils/utils';


const OffCanvas = ({ isOpen, setIsOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    const toggleProfileSidebar = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const user = useSelector(state => state.user)
    const loggedIn = isLoggedIn(user);


    return (
        <>
            <CustomDialog open={isOpen} toggle={toggleSidebar}>
                <div className='ps-9 pe-6 pt-6'>
                    <div onClick={toggleSidebar} className='flex justify-end'>
                        <img src={Images.Close} alt="close" className='w-6 h-6' />
                    </div>

                    {loggedIn &&
                        <div
                            className={'nav-list-items flex items-center py-6 justify-between'} onClick={toggleProfileSidebar}
                        >
                            <div className='flex gap-3 text-lg items-center'>
                                <img src={Images.Person} alt="Person Icon" className="w-8 h-8" />
                                Hi, {user?.firstName}
                            </div>
                            <BsChevronRight size={22} />
                        </div>
                    }

                    <ul>
                        <li className='nav-list-items py-2 text-2xl'>Classics</li>
                        <li className='nav-list-items py-2 text-2xl'>Men</li>
                        <li className='nav-list-items py-2 text-2xl'>Women</li>
                        <li className='nav-list-items py-2 text-2xl'>Kids</li>
                        <li className='nav-list-items py-2 text-2xl'>Sale</li>
                        <li className='nav-list-items py-2 text-2xl'>SNKRS</li>
                    </ul>
                    <div className='py-6 flex gap-4 items-center'>
                        <img src={Images.JordanLogo} alt='jordan' className='w-8 h-8' />
                        <span className='font-bold'>Jordan</span>
                    </div>
                    {!user &&
                        <div className='pb-8 pt-2'>
                            <div className='track-tighter font-semibold text-xl text-textPrimary'>
                                Become a Nike Member for the best products, inspiration and stories in sport.
                                <span className='text-black'> Learn more</span>
                            </div>
                            <div className='flex mt-6 gap-3'>
                                <button className='black-btn'>Join Us</button>
                                <button className='white-btn'>Sign In</button>
                            </div>
                        </div>
                    }
                    <div>
                        <ul>
                            {user &&
                                <li className='flex gap-2 py-2 tracking-tight font-semibold items-center'>
                                    <img src={Images.Favorite} alt="store" className='w-6 h-6' />
                                    Favourites
                                </li>
                            }
                            <li className='flex gap-2 py-2 tracking-tight font-semibold items-center'>
                                <img src={Images.Cart} alt="cart" className='w-6 h-6' />
                                Bag
                            </li>
                            <li className='flex gap-2 py-2 tracking-tight font-semibold items-center'>
                                <img src={Images.Orders} alt="orders" className='w-6 h-6' />
                                Orders
                            </li>
                            <li className='flex gap-2 py-2 tracking-tight font-semibold items-center'>
                                <img src={Images.Store} alt="store" className='w-6 h-6' />
                                Find a Store
                            </li>
                            <li className='flex gap-2 py-2 tracking-tight font-semibold items-center'>
                                <img src={Images.Help} alt="help" className='w-6 h-6' />
                                Help
                            </li>
                        </ul>
                    </div>
                </div>
            </CustomDialog>

            {/* Profile Sidebar */}
            <CustomDialog open={isProfileOpen} toggle={toggleProfileSidebar}>
                <div className="flex justify-between items-center pt-6 px-6">
                    <div className='flex items-center gap-3 font-semibold text-md'
                        onClick={toggleProfileSidebar}
                    >
                        <BsChevronLeft size={20} />
                        All
                    </div>
                    <div onClick={toggleProfileSidebar}>
                        <img src={Images.Close} alt="close" className="w-6 h-6" />
                    </div>
                </div>

                <div className="px-9 py-6">
                    <ul>
                        <li className="nav-list-items py-3 text-[27px]">My Account</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Profile</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Orders</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Favourites</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Inbox</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Experiences</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Account Settings</li>
                        <li className="nav-list-items py-2 text-md font-semibold text-textPrimary">Logout</li>
                    </ul>
                </div>
            </CustomDialog>
        </>
    );
};

OffCanvas.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}

export default OffCanvas;
