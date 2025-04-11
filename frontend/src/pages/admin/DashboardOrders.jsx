import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllDashboardOrders } from '../../services/dashboardApi';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import OrderTable from '../../components/Dashboard/OrderTable';

function DashboardOrders() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5

    const { isLoading, data: { orders = [], pagination = {} } = {}, } = useQuery({
        queryKey: ['DashboardOrders', currentPage, limit],
        queryFn: () => getAllDashboardOrders(currentPage, limit),
        keepPreviousData: true,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className='dashboard-heading'>Orders</p>
            </div>
            {isLoading ?
                <Loader />
                :
                <>
                    <OrderTable orders={orders} />
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

export default DashboardOrders;