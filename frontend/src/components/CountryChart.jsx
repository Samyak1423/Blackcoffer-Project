// frontend/src/components/CountryChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountryChart = ({ chartData }) => {
    const processData = (data) => {
        const countryCounts = {};
        data.forEach(item => {
            if (item.country) {
                // --- THIS IS THE CHANGE ---
                // If the country is "United States of America", change it to "USA"
                let countryName = item.country;
                if (countryName === "United States of America") {
                    countryName = "USA";
                }
                countryCounts[countryName] = (countryCounts[countryName] || 0) + 1;
            }
        });

        const sortedCountries = Object.entries(countryCounts).sort(([, a], [, b]) => a - b).slice(-10);

        const labels = sortedCountries.map(([country]) => country);
        const dataPoints = sortedCountries.map(([, count]) => count);
        return { labels, dataPoints };
    };

    const { labels, dataPoints } = processData(chartData);
    
    const colorPalette = [
        '#F5C9B0', '#D3A995', '#A98C78', '#7E6C5F', '#544B42', 
        '#2d5a49', '#7a9e7e', '#b2bba2', '#d9ceb2', '#e5e0d8'
    ];

    const data = {
        labels,
        datasets: [{
            label: 'Number of Insights',
            data: dataPoints,
            backgroundColor: dataPoints.map((_, index) => colorPalette[index % colorPalette.length]),
            borderRadius: 3,
        }]
    };
    
    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true,
        layout: {
            padding: {
                top: 20
            }
        },
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: 'Top 10 Countries by Insights',
            font: { size: 18 },
            color: '#1C352D',
         }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#1C352D' }
            },
            y: {
                grid: { drawOnChartArea: false, drawTicks: false },
                ticks: {
                    color: '#1C352D',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default CountryChart;