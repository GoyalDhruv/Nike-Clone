import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const SidebarContext = createContext()

export const useSidebarContext = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {

    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const [openSubmenu, setOpenSubmenu] = useState("");

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen((prev) => !prev);
    };

    const toggleSubmenu = (item) => {
        setOpenSubmenu((prev) => (prev === item ? null : item));
    };

    return (
        <SidebarContext.Provider
            value={{
                isExpanded: isMobile ? false : isExpanded,
                isMobileOpen,
                isMobile,
                activeItem,
                openSubmenu,
                toggleSidebar,
                toggleMobileSidebar,
                setActiveItem,
                toggleSubmenu,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

SidebarProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
