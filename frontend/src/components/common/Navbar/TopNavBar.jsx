import React from 'react'
import DropdownMenu from './DropdownMenu';
import Images from '../../../constants/imageConstant';

const VerticalLine = () => <div className="h-4 mx-2 border-black border-e-[1px]" />;
function TopNavBar() {
    const user = true;

    return (
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
    )
}

export default TopNavBar