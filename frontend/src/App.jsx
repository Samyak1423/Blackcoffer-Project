// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Filters from './components/Filters';
import ChartsContainer from './components/ChartsContainer'; // Import the new container

function App() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [chartData, setChartData] = useState([]);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };
   const resetFilters = () => {
        setSelectedFilters({});
        // You might need to reset the dropdowns in Filters.jsx visually
        // For simplicity, this clears the data query
    };

  useEffect(() => {
    // Build a query string, making sure to ignore empty filter values
    const queryParams = Object.keys(selectedFilters)
      .filter(key => selectedFilters[key])
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(selectedFilters[key])}`)
      .join('&');
      
    axios.get(`http://localhost:5000/api/data?${queryParams}`)
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [selectedFilters]);

  return (
    <div className="app">
      <Filters onFilterChange={handleFilterChange} onReset={resetFilters} />
      <main className="charts-container">
      <h1><span className="gradient-text">Data Visualization Dashboard</span></h1>
        {/* Replace the placeholder text with the ChartsContainer component */}
        <ChartsContainer chartData={chartData} />
      </main>
    </div>
  );
}

export default App;