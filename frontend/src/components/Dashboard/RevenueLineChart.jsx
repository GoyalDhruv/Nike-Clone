import React from 'react'
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

function RevenueLineChart({ revenueAccordingToMonth }) {

    const months = revenueAccordingToMonth.map(item => {
        const date = new Date(item._id);
        return date.toLocaleString('default', { month: 'short' });
    });

    const amounts = revenueAccordingToMonth.map(item => item.totalAmount);

    const seriesData = ({
        series: [{
            name: "Revenue",
            data: amounts,
        }],
        options: {
            chart: {
                height: 400,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                colors: ['#000'],
            },
            title: {
                text: 'Revenue Trends by Month',
                align: 'center',
                style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000',
                },
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: months,
                title: {
                    text: 'Months',
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return '₹' + value.toLocaleString();
                    }
                },
                title: {
                    text: 'Revenue',
                },
            }
        }
    });

    return (
        <>
            <ReactApexChart options={seriesData.options} series={seriesData.series} type="line" height={400} />
        </>
    )
}

RevenueLineChart.propTypes = {
    revenueAccordingToMonth: PropTypes.array
}

export default RevenueLineChart