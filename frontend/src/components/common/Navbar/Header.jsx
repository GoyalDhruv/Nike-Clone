import React, { useState } from 'react'
import Images from '../../../constants/imageConstant'
import OffCanvas from './OffCanvas';
import CustomContainer from '../../../layouts/CustomContainer';
import { Link, useNavigate } from "react-router";
import { isLoggedIn } from '../../../utils/utils';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import HeaderLinks from './HeaderLinks';

function Header() {
    const user = useSelector(state => state.user);
    const loggedIn = isLoggedIn(user);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleCart = () => {
        if (loggedIn) {
            navigate('/cart')
        }
        else {
            toast.error('You must be logged in to view the cart')
        }
    }

    const handleFavorite = () => {
        if (loggedIn) {
            navigate('/favorites')
        }
        else {
            toast.error('You must be logged in to view your favorites')
        }
    }

    return (
        <CustomContainer customClass={"py-1 grid grid-cols-12 items-center bg-white"}>
            <div className='md:col-span-3 col-span-6'>
                <Link to={'/'}>
                    <img src={Images.Nike} alt="Nike Logo" className="w-16 h-16 cursor-pointer" />
                </Link>
            </div>
            <ul className=' gap-5 col-span-5 hidden md:flex justify-center'>
                <HeaderLinks />
            </ul>
            <div className='flex justify-end items-center md:col-span-4 col-span-6'>
                <div className='hover:bg-[#d5d5d5] rounded-full p-2 block xl:hidden cursor-pointer'>
                    <img src={Images.Search} alt="search" className='w-6 h-6' />
                </div>

                <div className='relative pe-2 hidden xl:block'>
                    <div className='hover:bg-[#d5d5d5] rounded-full p-2 absolute cursor-pointer'>
                        <img src={Images.Search} alt="search" className='w-6 h-6' />
                    </div>
                    <input type="text" className=' bg-bgPrimary nav-icons cursor-auto placeholder:font-medium ps-10 outline-none placeholder:text-[#707076]' placeholder='Search' />
                </div>
                <div className='nav-icons' onClick={handleFavorite}>
                    <img src={Images.Favorite} alt="Favorite" className='w-6 h-6' />
                </div>
                <div className='nav-icons' onClick={handleCart}>
                    <img src={Images.Cart} alt="Cart" className='w-6 h-6' />
                </div>
                <div className='nav-icons block md:hidden'>
                    <img src={Images.Menu} alt="Menu" className='w-6 h-6' onClick={() => setIsOpen(!isOpen)} />
                </div>
                <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </CustomContainer>
    )
}

export default Header