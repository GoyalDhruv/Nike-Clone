import React, { useState } from 'react';
import Images from '../../constants/imageConstant';
import DropdownMenu from '../DropdownMenu';
import OffCanvas from '../OffCanvas';

const VerticalLine = () => <div className="h-4 mx-2 border-black border-e-[1px]" />;

function Navbar() {
    const user = true;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-[#f5f5f5] px-12 py-1 justify-between items-center hidden md:flex">
                <img src={Images.JordanLogo} alt="Jordan Logo" className="w-6 h-6" />

                <div className="flex items-center">
                    <p className='nav-items'>Find a Store</p>
                    <VerticalLine />

                    <DropdownMenu
                        menuTitle={<p className='-mt-[22px] nav-items'>Help</p>}
                        subTitle='Help'
                        items={[
                            { label: 'Order Status', href: '#' },
                            { label: 'Dispatch and Delivery', href: '#' },
                            { label: 'Return', href: '#' },
                            { label: 'Contact Us', href: '#' },
                            { label: 'Privacy Policy', href: '#' },
                            { label: 'Terms of Sale', href: '#' },
                            { label: 'Terms of Use', href: '#' },
                            { label: 'Send us Feedback', href: '#' },
                        ]}
                    />
                    <VerticalLine />
                    {!user ? (
                        <>
                            <p className='nav-items'>Join Us</p>
                            <VerticalLine />
                            <p className='nav-items'>Sign In</p>
                        </>
                    ) : (
                        <>
                            <DropdownMenu
                                menuTitle={
                                    <p className={'nav-items flex gap-3 items-center'}>
                                        Hi, User
                                        <img src={Images.Person} alt="Person Icon" className="w-6 h-6" />
                                    </p>
                                }
                                subTitle='Account'
                                items={[
                                    { label: 'Profile', href: '#' },
                                    { label: 'Orders', href: '#' },
                                    { label: 'Faviourites', href: '#' },
                                    { label: 'Inbox', href: '#' },
                                    { label: 'Experiences', href: '#' },
                                    { label: 'Account Settings', href: '#' },
                                    { label: 'Log Out', href: '#' },
                                ]}
                            />
                        </>
                    )}
                </div>
            </nav>

            <header className="md:px-12 px-6 py-1 grid grid-cols-12 items-center ">
                <div className='md:col-span-3 col-span-6'>
                    <img src={Images.NikeLogo} alt="Jordan Logo" className="w-16 h-16" />
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
                    <div className='hover:bg-[#d5d5d5] rounded-full p-2 block xl:hidden'>
                        <img src={Images.Search} alt="search" className='w-6 h-6' />
                    </div>

                    <div className='relative pe-2 hidden xl:block'>
                        <div className='hover:bg-[#d5d5d5] rounded-full p-2 absolute'>
                            <img src={Images.Search} alt="search" className='w-6 h-6' />
                        </div>
                        <input type="text" className='p-2 bg-[#f5f5f5] hover:bg-[#e5e5e5] rounded-full placeholder:font-medium ps-10 outline-none
                        ' placeholder='Search' />
                    </div>
                    <div className='hover:bg-[#e5e5e5] rounded-full p-2'>
                        <img src={Images.Favorite} alt="search" className='w-6 h-6' />
                    </div>
                    <div className='hover:bg-[#e5e5e5] rounded-full p-2'>
                        <img src={Images.Cart} alt="search" className='w-6 h-6' />
                    </div>
                    <div className='hover:bg-[#e5e5e5] rounded-full p-2 block md:hidden'>
                        <img src={Images.Menu} alt="search" className='w-6 h-6' onClick={()=>setIsOpen(!isOpen)} />
                    </div>
                    <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </header>
        </>
    );
}

export default Navbar;
