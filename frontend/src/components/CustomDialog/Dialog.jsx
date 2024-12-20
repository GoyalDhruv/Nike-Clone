import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, { Children } from 'react'
import PropTypes from 'prop-types';


function CustomDialog({ children, open, toggle }) {

    return (
        <Dialog open={open} onClose={toggle} className="relative z-50 md:hidden">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
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
    toggle: PropTypes.func
}

export default CustomDialog