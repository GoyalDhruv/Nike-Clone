import React from 'react'
import Images from '../../constants/imageConstant'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Footer() {

    const sections = [
        {
            title: 'Resources',
            items: ['Find a Store', 'Become a Member', 'Send Us Feedback'],
        },
        {
            title: 'Help',
            items: ['Get Help', 'Order Status', 'Delivery', 'Returns', 'Payment Option', 'Contact Us'],
        },
        {
            title: 'Company',
            items: ['About Nike', 'News', 'Careers'],
        },
    ]

    return (
        <footer className='w-full md:px-10 px-6'>
            <div className='border-b md:mb-14' />
            <div className="md:hidden">
                {sections.map((section, index) => (
                    <Disclosure key={index}>
                        {({ open }) => (
                            <div className='border-b'>
                                <DisclosureButton
                                    className={`${open ? 'pt-7' : 'py-7'} w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center`}
                                >
                                    {section.title}
                                    <FaAngleDown className={`${open ? 'rotate-180' : ''} w-5 transition-transform`} />
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <ul className="py-6">
                                        {section.items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className=" py-[2px] text-md font-semibold text-textPrimary hover:text-black cursor-pointer"
                                            >
                                                {item === 'Find a Store' ? (
                                                    <Link to='/locate-store'>{item}</Link>
                                                ) : item === 'Become a Member' ? (
                                                    <Link to='/sign-in'>{item}</Link>
                                                ) : (
                                                    item
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </DisclosurePanel>
                            </div>
                        )}
                    </Disclosure>
                ))}
                <div className="flex gap-1 items-center text-textPrimary py-5 border-b">
                    <img src={Images.Location} alt="location" className="w-5 h-5 mt-[2px]" />
                    <span className="text-md font-medium">India</span>
                </div>
            </div>

            <div className='hidden md:grid grid-cols-4'>
                {sections.map((section, index) => (
                    <ul key={index}>
                        <li className="text-md font-semibold tracking-tight cursor-default mb-8">
                            {section.title}
                        </li>
                        {section.items.map((item, idx) => (
                            <li
                                key={idx}
                                className="mb-1 text-md cursor-pointer font-medium text-textPrimary hover:text-black"
                            >
                                {item === 'Find a Store' ? (
                                    <Link to='/locate-store'>{item}</Link>
                                ) : item === 'Become a Member' ? (
                                    <Link to='/sign-in'>{item}</Link>
                                ) : (
                                    item
                                )}
                            </li>
                        ))}
                    </ul>
                ))}

                <div className='flex gap-1 justify-end items-start text-textPrimary'>
                    <img src={Images.Location} alt="location" className='w-5 h-5 mt-[2px]' />
                    <span className='text-md font-medium text-textPrimary'>India</span>
                </div>
            </div>

            <ul className='flex gap-3 sm:gap-7 py-12 flex-col sm:flex-row'>
                <li className='text-md sm:text-sm sm:font-semibold font-bold text-textPrimary'>
                    <span className='text-sm sm:font-semibold font-bold'>©</span> {new Date().getFullYear()} Nike, Inc. All rights reserved
                </li>
                <li className='text-md sm:text-sm sm:font-semibold font-bold text-textPrimary hover:text-black'>
                    Terms of Sale
                </li>
                <li className='text-md sm:text-sm sm:font-semibold font-bold text-textPrimary hover:text-black'>
                    Terms of Use
                </li>
                <li className='text-md sm:text-sm sm:font-semibold font-bold text-textPrimary hover:text-black'>
                    Nike Privacy Policy
                </li>
            </ul>
        </footer>
    )
}

export default Footer