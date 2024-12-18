import React from 'react'
import Images from '../../../constants/imageConstant'
import OffCanvas from './OffCanvas';
import { useMobileNavbar } from '../../../contexts/MobileNavbar';

function Header() {

    const { isOpen, setIsOpen } = useMobileNavbar()

    return (
        <header className="md:px-12 px-6 py-1 grid grid-cols-12 items-center bg-white">
            <div className='md:col-span-3 col-span-6'>
                <img src={Images.NikeLogo} alt="Nike Logo" className="w-16 h-16 cursor-pointer" />
            </div>
            <ul className=' gap-5 col-span-5 hidden md:flex justify-center'>
                <li className='nav-list-items'>New & Featured</li>
                <li className='nav-list-items'>Men</li>
                <li className='nav-list-items'>Women</li>
                <li className='nav-list-items'>Kids</li>
                <li className='nav-list-items'>Sale</li>
                <li className='nav-list-items'>SNKRS</li>
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
                <OffCanvas />
            </div>
        </header>
    )
}

export default Header