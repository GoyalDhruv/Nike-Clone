import React from 'react'
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

function TopProductsBarChart({ topProducts }) {

    const productNames = topProducts.map(item => item.name);
    const totalSold = topProducts.map(item => item.totalSold);

    const seriesData = {
        series: [{
            name: 'Total Sold',
            data: totalSold,
        }],
        options: {
            chart: {
                type: 'bar',
                height: 400,
                toolbar: {
                    show: false,
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    endingShape: 'rounded',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 1000,
                            color: '#000'
                        }]
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['#fff'],
            },
            title: {
                text: 'Top Products by Units Sold',
                align: 'center',
                style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000',
                },
            },
            xaxis: {
                categories: productNames,
                title: {
                    text: 'Total Sold',
                }
            },
            yaxis: {
                title: {
                    text: 'Products',
                }
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
        }
    };

    return (
        <>
            <ReactApexChart options={seriesData.options} series={seriesData.series} type="bar" height={400} />
        </>
    )
}

TopProductsBarChart.propTypes = {
    topProducts: PropTypes.array
}


export default TopProductsBarChart