import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearUserCredentials } from '../../store/slices/userSlice';
import { setCart } from '../../store/slices/cartSlice';
import { setFavorite } from '../../store/slices/favoriteSlice';
import toast from 'react-hot-toast';
import { useSidebarContext } from '../../contexts/DashboardSidebarContext';

const DashboardNavbar = () => {
    const dispatch = useDispatch();

    const { toggleSidebar, toggleMobileSidebar } = useSidebarContext()

    const handleToggle = () => {
        if (window.innerWidth >= 768) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };


    const handleLogout = () => {
        window.location.href = '/';
        dispatch(clearUserCredentials());
        dispatch(setCart([]));
        dispatch(setFavorite([]));
        toast.success("User logged out successfully");
    };

    return (
        <header className="py-4 grid grid-cols-12 top-0 sticky items-center bg-white border-b border-gray-200 px-5" style={{zIndex:"99999999"}}>
            <div className="col-span-12 flex justify-between items-center">
                <button className="text-xl" onClick={handleToggle}>
                    <FaBars />
                </button>
                <button className="md:w-auto py-2 px-5 btn white-btn" onClick={handleLogout}>
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default DashboardNavbar;
