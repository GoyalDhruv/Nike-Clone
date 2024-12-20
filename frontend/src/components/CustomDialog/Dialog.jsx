import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, { Children } from 'react'
import PropTypes from 'prop-types';


function CustomDialog({ children, open, toggle, bottom }) {

    return (
        <Dialog open={open} onClose={toggle} className="relative z-50 lg:hidden">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className={`relative ml-auto flex size-full  transform flex-col overflow-y-auto bg-white shadow-xl transition duration-300 ease-in-out 
                        ${bottom ? 'data-[closed]:translate-y-full' : 'max-w-xs data-[closed]:translate-x-full'}
                    `}
                >
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

CustomDialog.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    toggle: PropTypes.func,
    bottom: PropTypes.bool,
}

export default CustomDialog