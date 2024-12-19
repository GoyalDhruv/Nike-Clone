import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader/Loader';

const Layout = React.lazy(() => import('./layouts/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));

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
          <Route path="/product" element={
            <Suspense
              fallback={<Loader />}>
              <Products />
            </Suspense>
          }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
