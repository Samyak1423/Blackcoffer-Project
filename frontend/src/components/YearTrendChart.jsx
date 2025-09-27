import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YearTrendChart = ({ chartData }) => {
    const processData = (data) => {
        const startYearCounts = {};
        const endYearCounts = {};
        const allYears = new Set();

        data.forEach(item => {
            if (item.start_year) {
                startYearCounts[item.start_year] = (startYearCounts[item.start_year] || 0) + 1;
                allYears.add(item.start_year);
            }
            if (item.end_year) {
                endYearCounts[item.end_year] = (endYearCounts[item.end_year] || 0) + 1;
                allYears.add(item.end_year);
            }
        });

        const labels = Array.from(allYears).sort((a, b) => a - b);
        const startData = labels.map(year => startYearCounts[year] || 0);
        const endData = labels.map(year => endYearCounts[year] || 0);
        
        return { labels, startData, endData };
    };
    
    const { labels, startData, endData } = processData(chartData);

    const data = {
        labels,
        datasets: [
            {
                label: 'Insights Started',
                data: startData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
                tension: 0.1
            },
            {
                label: 'Insights Ended',
                data: endData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true,
                tension: 0.1
            }
        ]
    };
    
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { 
            display: true, 
            text: 'Trend of Insights (Start vs. End Year)',
            font: { size: 18 },
            color: '#1C352D'
          }
        }
    };

    return <Line options={options} data={data} />;
};

export default YearTrendChart;
