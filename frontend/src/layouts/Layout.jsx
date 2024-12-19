import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar'
import Footer from '../components/common/Footer'

function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
