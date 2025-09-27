// frontend/src/components/DoughnutChart.jsx

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ chartData }) => {
    const processData = (data) => {
        const topicCounts = {};
        data.forEach(item => {
            if (item.topic) {
                topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
            }
        });

        const sortedTopics = Object.entries(topicCounts)
            .sort(([, a], [, b]) => b - a);
        
        // --- THIS IS THE CHANGE ---
        const topTopics = sortedTopics.slice(0, 20); // Now showing top 20
        const otherCount = sortedTopics.slice(20).reduce((acc, [, count]) => acc + count, 0); // And grouping the rest

        let labels = topTopics.map(([topic]) => topic);
        let dataPoints = topTopics.map(([, count]) => count);

        if (otherCount > 0) {
            labels.push('Other');
            dataPoints.push(otherCount);
        }
        
        return { labels, dataPoints };
    };

    const { labels, dataPoints } = processData(chartData);
    
    const colorPalette = [
        '#1C352D', '#A6B28F', '#F5C9B0', '#D3A995', '#A98C78', '#7E6C5F', '#544B42',
        '#2d5a49', '#7a9e7e', '#b2bba2', '#d9ceb2', '#e5e0d8', '#2980b9', '#27ae60',
        '#f1c40f', '#e67e22', '#e74c3c', '#8e44ad', '#7f8c8d', '#34495e', '#bdc3c7'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Insights Count',
            data: dataPoints,
            backgroundColor: colorPalette,
            borderColor: '#F9F6F3',
            borderWidth: 2,
        }]
    };
    
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { 
            // With this many items, it's best to keep the legend off
            display: false 
         },
          title: { 
            display: true, 
            text: 'Top Insights by Topic',
            font: { size: 18 },
            color: '#1C352D',
         }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;