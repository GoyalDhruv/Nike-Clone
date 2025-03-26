import React from 'react'
import DropdownMenu from './DropdownMenu';
import Images from '../../../constants/imageConstant';
import { Link } from "react-router";
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../../utils/utils';

const VerticalLine = () => <div className="h-4 mx-2 border-black border-e-[1px]" />;
function TopNavBar() {

    const user = useSelector(state => state.user);
    const loggedIn = isLoggedIn(user);

    return (
        <nav className="bg-bgPrimary px-12 py-1 justify-between items-center hidden md:flex">
            <img src={Images.JordanLogo} alt="Jordan Logo" className="w-6 h-6 cursor-pointer" />

            <div className="flex items-center">
                <Link to='locate-store'>
                    <p className='nav-items'>Find a Store</p>
                </Link>
                <VerticalLine />

                <Link to='orders'>
                    <p className='nav-items'>Orders</p>
                </Link>
                {/* <DropdownMenu
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
                    isNavBar={true}
                /> */}
                <VerticalLine />
                {!loggedIn ? (
                    <>
                        <Link to={{
                            pathname: "/sign-up"
                        }}>
                            <p className='nav-items'>Join Us</p>
                        </Link>
                        <VerticalLine />
                        <Link to={{
                            pathname: "/sign-in"
                        }}>
                            <p className='nav-items'>Sign In</p>
                        </Link>
                    </>
                ) : (
                    <>
                        <DropdownMenu
                            menuTitle={
                                <p className={'nav-items flex gap-3 items-center'}>
                                    Hi, {user?.firstName}
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
                            isNavBar={true}
                        />
                    </>
                )}
            </div>
        </nav>
    )
}

export default TopNavBar