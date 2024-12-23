import React, { useState } from 'react'
import Images from '../../../constants/imageConstant'
import OffCanvas from './OffCanvas';
import CustomContainer from '../../../layouts/CustomContainer';
import { Link } from "react-router";

function Header() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <CustomContainer customClass={"py-1 grid grid-cols-12 items-center bg-white"}>
            <div className='md:col-span-3 col-span-6'>
                <Link to={'/'}>
                    <img src={Images.NikeLogo} alt="Nike Logo" className="w-16 h-16 cursor-pointer" />
                </Link>
            </div>
            <ul className=' gap-5 col-span-5 hidden md:flex justify-center'>
                <Link to={{
                    pathname: "/products",
                    search: "?status=new_arrival",
                }}>
                    <li className='nav-list-items'>New & Featured</li>
                </Link>
                <Link to={{
                    pathname: "/products",
                    search: "?gender=men",
                }}>
                    <li className='nav-list-items'>Men</li>
                </Link>
                <Link to={{
                    pathname: "/products",
                    search: "?gender=women",
                }}>
                    <li className='nav-list-items'>Women</li>
                </Link>
                <Link to={{
                    pathname: "/products",
                    search: "?isKids=true",
                }}>
                    <li className='nav-list-items'>Kids</li>
                </Link>
                <Link to={{
                    pathname: "/products",
                    search: "?status=discount",
                }}>
                    <li className='nav-list-items'>Sale</li>
                </Link>
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
                <div className='nav-icons'>
                    <img src={Images.Favorite} alt="Favorite" className='w-6 h-6' />
                </div>
                <div className='nav-icons'>
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