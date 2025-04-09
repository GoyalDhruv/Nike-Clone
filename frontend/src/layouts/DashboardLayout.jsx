import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/DashboardNavbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {

    return (
        <div className="min-h-screen bg-white flex">
            <Sidebar />

            <div className="flex-1 transition-all duration-300 ease-in-out">
                <Navbar />
                <main className="lg:p-5 p-4 w-full overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

