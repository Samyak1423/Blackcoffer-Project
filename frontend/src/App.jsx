import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Filters from './components/Filters';
import ChartsContainer from './components/ChartsContainer';

function App() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This will hold the original full list of data
  const [fullData, setFullData] = useState([]);

  // Fetch all data just once on initial load
  useEffect(() => {
    axios.get(`http://localhost:5000/api/data`)
      .then(response => {
        setFullData(response.data);
        setChartData(response.data); // Initially show all data
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterName]: value
    };
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filteredData = [...fullData];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) { // Only filter if a value is selected
        filteredData = filteredData.filter(item => String(item[key]) === String(value));
      }
    });
    setChartData(filteredData);
  };
  
  const resetFilters = () => {
    setSelectedFilters({});
    setChartData(fullData); // Reset to show all data
    // This is a simple way to reset the dropdowns visually
    const selects = document.querySelectorAll('.filters-sidebar select');
    selects.forEach(select => select.value = '');
  };

  return (
    <div className="app">
      <Filters onFilterChange={handleFilterChange} onResetFilters={resetFilters} />
      <div className="main-content">
        <header className="header">
          <h1>Analytics Dashboard</h1>
        </header>
        <main className="charts-container">
          {isLoading ? <p>Loading Dashboard...</p> : <ChartsContainer chartData={chartData} />}
        </main>
      </div>
    </div>
  );
}

export default App;
