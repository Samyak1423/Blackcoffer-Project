// frontend/src/components/TopicBarChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopicBarChart = ({ chartData }) => {
    const processData = (data) => {
        const topicCounts = {};
        data.forEach(item => {
            if (item.topic) {
                topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
            }
        });

        const sortedTopics = Object.entries(topicCounts).sort(([, a], [, b]) => b - a);
        const topTopics = sortedTopics.slice(0, 10);

        const labels = topTopics.map(([topic]) => topic);
        const dataPoints = topTopics.map(([, count]) => count);
        return { labels, dataPoints };
    };

    const { labels, dataPoints } = processData(chartData);
    
    // --- THIS IS THE FIX ---
    // A beautiful color palette that matches your theme
    const colorPalette = [
        '#1C352D', '#A6B28F', '#F5C9B0', '#D3A995', '#A98C78', 
        '#7E6C5F', '#544B42', '#8c9a89', '#c4ac9e', '#9b8b7e'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of Insights',
            data: dataPoints,
            // We now map over the data to assign a color to each bar
            backgroundColor: dataPoints.map((_, index) => colorPalette[index % colorPalette.length]),
            borderRadius: 5,
        }]
    };
    
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: 'Top 10 Topics',
            font: { size: 18 },
            color: '#1C352D',
         }
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default TopicBarChart;