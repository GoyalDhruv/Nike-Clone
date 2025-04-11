import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader/Loader';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { useSelector } from 'react-redux';

const Layout = React.lazy(() => import('./layouts/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductById = React.lazy(() => import('./pages/IndividualProduct'));
const AddProduct = React.lazy(() => import('./pages/admin/AddProduct'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/SignUp'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Favorite = React.lazy(() => import('./pages/Favourites'));
const PaymentSuccess = React.lazy(() => import('./pages/PaymentSuccess'));
const StoreLocation = React.lazy(() => import('./pages/StoreLocation'));
const Orders = React.lazy(() => import('./pages/Orders'));
const IndividualOrders = React.lazy(() => import('./pages/IndividualOrder'));
const DashboardLayout = React.lazy(() => import('./layouts/DashboardLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const DashboardProducts = React.lazy(() => import('./pages/admin/DashboardProducts'));
const DashboardUsers = React.lazy(() => import('./pages/admin/DashboardUsers'));
const DashboardOrders = React.lazy(() => import('./pages/admin/DashboardOrders'));

function App() {
  const user = useSelector(state => state.user);
  const role = user?.role

  useEffect(() => {
    if (window.location.pathname === '/' && role === "Admin") {
      window.location.pathname = '/dashboard'
    }
  }, [role])

  const renderRoutes = () => {
    if (role === 'Admin') {
      return (
        <Route path="/dashboard" element={
          <Suspense fallback={<Loader />}>
            <DashboardLayout />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path='/dashboard/products' element={
            <Suspense fallback={<Loader />}>
              <DashboardProducts />
            </Suspense>
          } />
          <Route path='/dashboard/products/add' element={
            <Suspense fallback={<Loader />}>
              <AddProduct />
            </Suspense>
          } />
          <Route path='/dashboard/products/edit/:id' element={
            <Suspense fallback={<Loader />}>
              <AddProduct />
            </Suspense>
          } />
          <Route path='/dashboard/users' element={
            <Suspense fallback={<Loader />}>
              <DashboardUsers />
            </Suspense>
          } />
          <Route path='/dashboard/orders' element={
            <Suspense fallback={<Loader />}>
              <DashboardOrders />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<Loader />}>
              <PageNotFound />
            </Suspense>
          } />
        </Route>
      );
    } else {
      return (
        <>
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Layout />
            </Suspense>
          }>
            <Route index element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            } />
            <Route path="/products" element={
              <Suspense fallback={<Loader />}>
                <Products />
              </Suspense>
            } />
            <Route path="/product/:id" element={
              <Suspense fallback={<Loader />}>
                <ProductById />
              </Suspense>
            } />
            <Route path='/cart' element={
              <ProtectedRoutes isAdminRequired={false}>
                <Suspense fallback={<Loader />}><Cart /></Suspense>
              </ProtectedRoutes>
            } />

            <Route path='/favorites' element={
              <ProtectedRoutes isAdminRequired={false}>
                <Suspense fallback={<Loader />}><Favorite /></Suspense>
              </ProtectedRoutes>
            } />

            <Route path='/success' element={
              <ProtectedRoutes isAdminRequired={false}>
                <Suspense fallback={<Loader />}><PaymentSuccess /></Suspense>
              </ProtectedRoutes>
            } />

            <Route path='/locate-store' element={
              <Suspense fallback={<Loader />}>
                <StoreLocation />
              </Suspense>
            } />
            <Route path='/orders' element={
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            } />
            <Route path='/orders/:orderId' element={
              <Suspense fallback={<Loader />}>
                <IndividualOrders />
              </Suspense>
            } />

            <Route path='*' element={
              <Suspense fallback={<Loader />}>
                <PageNotFound />
              </Suspense>
            } />
          </Route>
        </>
      );
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='sign-in' element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path='sign-up' element={<Suspense fallback={<Loader />}><Signup /></Suspense>} />

        {renderRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;