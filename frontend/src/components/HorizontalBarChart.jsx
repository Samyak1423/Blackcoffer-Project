// frontend/src/components/HorizontalBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = ({ chartData }) => {
  const processData = (data) => {
    if (!data) return { labels: [], dataPoints: [] };
    const regionData = {};
    data.forEach(item => {
      if (item.region && typeof item.intensity === 'number') {
        if (!regionData[item.region]) {
          regionData[item.region] = { totalIntensity: 0, count: 0 };
        }
        regionData[item.region].totalIntensity += item.intensity;
        regionData[item.region].count++;
      }
    });
    const sortedRegions = Object.entries(regionData).sort((a, b) => {
        const avgA = a[1].totalIntensity / a[1].count;
        const avgB = b[1].totalIntensity / b[1].count;
        return avgA - avgB;
    });
    const labels = sortedRegions.map(([region]) => region);
    const dataPoints = sortedRegions.map(([, data]) => data.totalIntensity / data.count);
    return { labels, dataPoints };
  };

  const { labels, dataPoints } = processData(chartData);
  
  const colorPalette = ['#2d5a49', '#7a9e7e', '#b2bba2', '#d9ceb2', '#e5e0d8'];

  const data = {
    labels: labels,
    datasets: [{
        label: 'Average Intensity',
        data: dataPoints,
        backgroundColor: dataPoints.map((_, index) => colorPalette[index % colorPalette.length]),
        borderRadius: 3,
      }],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { 
        display: true, 
        text: 'Average Intensity by Region',
        font: { size: 18 },
        color: '#1C352D',
      },
    },
    scales: {
        x: { ticks: { color: '#1C352D' } },
        y: { ticks: { color: '#1C352D' } }
    }
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;