import { BiSolidDashboard } from 'react-icons/bi';
import { FaBox, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSidebarContext } from '../../contexts/DashboardSidebarContext';
import Images from '../../constants/imageConstant';

const navItems = [
    {
        icon: <BiSolidDashboard />,
        name: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: <FaBox />,
        name: "Products",
        path: "/dashboard/products"
    },
    {
        icon: <FaUser />,
        name: "Users",
        path: "/dashboard/users"
    },
    {
        icon: <FaShoppingCart />,
        name: "Orders",
        path: "/dashboard/orders"
    },
];


const Sidebar = () => {

    const { isExpanded, isMobileOpen, isMobile } = useSidebarContext();
    const location = useLocation();
    const isActive = location.pathname;

    return (
        <aside className={`bg-white border-r border-gray-200 pb-4 h-screen sticky top-0 transition-all duration-200
            ${isMobile ? (isMobileOpen ? 'w-[90px] px-2' : 'w-0') : ''} 
            ${!isMobile ? (isExpanded ? 'w-[290px] px-4' : 'w-[90px] px-2') : ''}`}>

            <div className="flex justify-center">
                <Link to={'/dashboard'}>
                    <img src={Images.Nike} alt="Logo" className="w-20 h-20 cursor-pointer" />
                </Link>
            </div>

            <nav className={`${isMobile ? (isMobileOpen ? 'flex flex-col gap-2' : 'hidden') : 'flex flex-col gap-2'}`}>
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`section-title flex items-center px-6 py-3 text-gray-900 no-underline !text-lg transition-all duration-300 rounded-lg hover:bg-gray-100
                            ${isActive === item?.path ? 'bg-gray-100' : ''} ${isExpanded ? 'gap-2' : 'justify-center'}`}
                    >
                        {item.icon}
                        {isExpanded && (
                            <span className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'hidden'}`}>
                                {item.name}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
