// frontend/src/components/RelevanceChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RelevanceChart = ({ chartData }) => {
    const processData = (data) => {
        const yearData = {};
        data.forEach(item => {
            if (item.start_year && item.relevance) {
                if (!yearData[item.start_year]) {
                    yearData[item.start_year] = { total: 0, count: 0 };
                }
                yearData[item.start_year].total += item.relevance;
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
            label: 'Average Relevance',
            data: dataPoints,
            borderColor: '#e67e22',
            backgroundColor: 'rgba(230, 126, 34, 0.5)',
            tension: 0.1
        }]
    };
    
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: 'Average Relevance Over Time',
            font: { size: 18 },
            color: '#1C352D'
          }
        }
    };

    return <Line options={options} data={data} />;
};

export default RelevanceChart;