// frontend/src/components/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ chartData }) => {
    const processData = (data) => {
        const yearData = {};
        data.forEach(item => {
            if (item.start_year && item.likelihood) {
                if (!yearData[item.start_year]) {
                    yearData[item.start_year] = { total: 0, count: 0 };
                }
                yearData[item.start_year].total += item.likelihood;
                yearData[item.start_year].count++;
            }
        });

        const labels = Object.keys(yearData).sort();
        const dataPoints = labels.map(year => yearData[year].total / yearData[year].count);
        return { labels, dataPoints };
    };
    
    const { labels, dataPoints } = processData(chartData);

    const data = {
        labels,
        datasets: [{
            label: 'Average Likelihood',
            data: dataPoints,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }]
    };
    
    const options = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Likelihood Over Time' }
        }
    };

    return <Line options={options} data={data} />;
};

export default LineChart;