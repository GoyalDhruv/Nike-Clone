import React, { useState } from 'react'
import ProductTable from '../../components/Dashboard/ProductTable'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getAllDashboardProduct } from '../../services/dashboardApi';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';

function DashboardProducts() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5

    const { isLoading, data: { products = [], pagination = {} } = {}, } = useQuery({
        queryKey: ['dashboardProducts', currentPage, limit],
        queryFn: () => getAllDashboardProduct(currentPage, limit),
        keepPreviousData: true,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className='dashboard-heading'>Products</p>
                <p>
                    <button className='btn black-btn flex items-center gap-1' onClick={() => navigate('/dashboard/products/add')}>Add</button>
                </p>
            </div>
            {isLoading ?
                <Loader />
                :
                <>
                    <ProductTable products={products} />
                    {pagination.totalPages >= 1 && (
                        <div className="fixed bottom-5 right-5 bg-white z-50 rounded-2xl">
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                limit={limit}
                            />
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default DashboardProducts
