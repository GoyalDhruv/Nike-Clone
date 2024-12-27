import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader/Loader';

const Layout = React.lazy(() => import('./layouts/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const AddProduct = React.lazy(() => import('./pages/Admin/AddProduct'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path='/admin/add-product' element={
            <Suspense fallback={<Loader />}>
              <AddProduct />
            </Suspense>
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
