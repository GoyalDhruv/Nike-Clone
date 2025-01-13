import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader/Loader';
import ProtectedRoutes from './utils/ProtectedRoutes';

const Layout = React.lazy(() => import('./layouts/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductById = React.lazy(() => import('./pages/IndividualProduct'));
const AddProduct = React.lazy(() => import('./pages/Admin/AddProduct'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/SignUp'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='sign-in' element={
          <Suspense
            fallback={<Loader />}>
            <Login />
          </Suspense>
        }
        />
        <Route path='sign-up' element={
          <Suspense
            fallback={<Loader />}>
            <Signup />
          </Suspense>
        }
        />
        <Route path="/" element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
        >
          <Route index element={
            <Suspense
              fallback={<Loader />}>
              <Home />
            </Suspense>
          }
          />
          <Route path="/products" element={
            <Suspense
              fallback={<Loader />}>
              <Products />
            </Suspense>
          }
          />
          <Route path="/product/:id" element={
            <Suspense
              fallback={<Loader />}>
              <ProductById />
            </Suspense>
          }
          />
          <Route path='/admin/add-product' element={
            <ProtectedRoutes isAdminRequired={true}>
              <Suspense fallback={<Loader />}>
                <AddProduct />
              </Suspense>
            </ProtectedRoutes>
          }
          />
          <Route path='*' element={
            <Suspense fallback={<Loader />}>
              <PageNotFound />
            </Suspense>
          }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
