// frontend/src/components/ChartsContainer.jsx

import React from 'react';
import HorizontalBarChart from './HorizontalBarChart';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import RelevanceChart from './RelevanceChart';
import CountryChart from './CountryChart';
import CityChart from './CityChart';
import KpiCard from './KpiCard'; // Make sure this is imported
import MapChart from './MapChart';

const ChartsContainer = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No data available for the selected filters. Please try a different combination.</p>;
  }
  
  // Calculate KPIs
  const totalInsights = chartData.length;
  const uniqueCountries = new Set(chartData.map(item => item.country).filter(Boolean)).size;
  const averageIntensity = chartData.length > 0
    ? (chartData.reduce((acc, item) => acc + (item.intensity || 0), 0) / chartData.length).toFixed(2)
    : 0;

  const chartCardStyle = { height: '450px', position: 'relative' };

  return (
    // We use a React Fragment <> to return multiple elements
    <>
      {/* --- THIS IS THE NEW PART --- */}
      {/* KPI Grid */}
      <div className="kpi-grid">
        <KpiCard title="Total Insights" value={totalInsights} icon="💡" />
        <KpiCard title="Unique Countries" value={uniqueCountries} icon="🌍" />
        <KpiCard title="Average Intensity" value={averageIntensity} icon="🔥" />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* --- Row 1 --- */}
        <div className="chart-card" style={chartCardStyle}>
          <HorizontalBarChart chartData={chartData} />
        </div>
        <div className="chart-card" style={chartCardStyle}>
          <DoughnutChart chartData={chartData} />
        </div>
        
        {/* --- Row 2 (Full Width) --- */}
        <div className="chart-card" style={{ ...chartCardStyle, gridColumn: '1 / -1' }}>
          <LineChart chartData={chartData} />
        </div>

        {/* --- Row 3 --- */}
        <div className="chart-card" style={chartCardStyle}>
          <CountryChart chartData={chartData} />
        </div>
         <div className="chart-card" style={chartCardStyle}>
          <CityChart chartData={chartData} />
        </div>

        {/* --- Row 4 (Full Width) --- */}
        <div className="chart-card" style={{ ...chartCardStyle, gridColumn: '1 / -1' }}>
          <RelevanceChart chartData={chartData} />
        </div>
        <div className="chart-card" style={{ height: 'auto', gridColumn: '1 / -1' }}>
    <MapChart chartData={chartData} />
</div>
      </div>
    </>
  );
};

export default ChartsContainer;