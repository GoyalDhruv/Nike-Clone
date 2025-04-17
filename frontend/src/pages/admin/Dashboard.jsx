import React from 'react'
import { getDashboardHome } from '../../services/dashboardapi';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import KPICards from '../../components/Dashboard/KPICards';
import RevenueLineChart from '../../components/Dashboard/RevenueLineChart';
import TopProductsBarChart from '../../components/Dashboard/TopProductsBarChart';

function Dashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['DashboardHome'],
        queryFn: getDashboardHome,
        select: ({ data }) => data,
    });

    return (
        <>
            <p className='dashboard-heading'>Dashboard</p>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
                        <KPICards data={data} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-10">
                        <RevenueLineChart revenueAccordingToMonth={data?.revenueAccordingToMonth} />
                        <TopProductsBarChart topProducts={data?.topProducts} />
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard