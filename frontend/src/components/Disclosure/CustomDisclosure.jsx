import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import React from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import PropTypes from 'prop-types'


function CustomDisclosure({ title, disclosureBody }) {

    return (
        <Disclosure as="div" className="border-t border-gray-200 py-3">
            <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="text-black font-semibold text-lg tracking-tight">{title}</span>
                    <span className="flex items-center">
                        <FaAngleDown aria-hidden="true" className="w-5 h-5 group-data-[open]:hidden text-black" />
                        <FaAngleUp aria-hidden="true" className="w-5 h-5 text-black group-[&:not([data-open])]:hidden" />
                    </span>
                </DisclosureButton>
            </h3>
            <DisclosurePanel className="py-3">
                {disclosureBody}
            </DisclosurePanel>
        </Disclosure>
    )
}

CustomDisclosure.propTypes = {
    title: PropTypes.string.isRequired,
    disclosureBody: PropTypes.element.isRequired,
}

export default CustomDisclosure