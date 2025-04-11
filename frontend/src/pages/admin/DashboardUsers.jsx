import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllDashboardUsers } from '../../services/dashboardApi';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import UserTable from '../../components/Dashboard/UserTable';

function DashboardUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5

    const { isLoading, data: { users = [], pagination = {} } = {}, } = useQuery({
        queryKey: ['DashboardUsers', currentPage, limit],
        queryFn: () => getAllDashboardUsers(currentPage, limit),
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
                    <UserTable users={users} />
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

export default DashboardUsers;