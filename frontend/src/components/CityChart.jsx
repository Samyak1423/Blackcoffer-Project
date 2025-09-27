// frontend/src/components/CityChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CityChart = ({ chartData }) => {
    const processData = (data) => {
        const cityCounts = {};
        data.forEach(item => {
            // We check for 'city' and make sure it's not an empty string
            if (item.city) {
                cityCounts[item.city] = (cityCounts[item.city] || 0) + 1;
            }
        });

        // Sort by count, and take the top 10
        const sortedCities = Object.entries(cityCounts).sort(([, a], [, b]) => a - b).slice(-10); 

        const labels = sortedCities.map(([city]) => city);
        const dataPoints = sortedCities.map(([, count]) => count);
        return { labels, dataPoints };
    };

    const { labels, dataPoints } = processData(chartData);

    const data = {
        labels,
        datasets: [{
            label: 'Number of Insights',
            data: dataPoints,
            backgroundColor: '#2980b9', // A different color for this chart
        }]
    };
    
    const options = {
        indexAxis: 'y', // Makes it a horizontal bar chart
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: 'Top 10 Cities by Insights',
            font: { size: 18 },
            color: '#1C352D',
         }
        }
    };

    return <Bar data={data} options={options} />;
};

export default CityChart;