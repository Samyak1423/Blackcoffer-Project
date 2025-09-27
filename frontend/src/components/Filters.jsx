// frontend/src/components/Filters.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filters = ({ onFilterChange, onResetFilters }) => {
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/filters')
      .then(response => {
        setFilterOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching filter options:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  const handleReset = () => {
    onResetFilters();
  };

  if (!filterOptions) {
    return <aside className="filters-sidebar"><h2>Filters</h2><p>Loading...</p></aside>;
  }

  return (
    <aside className="filters-sidebar">
      <h2>Filters</h2>
      <button className="reset-button" onClick={handleReset}>Reset All Filters</button>
      <div className="filter-group">
        <label htmlFor="topic">Topic</label>
        <select id="topic" name="topic" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.topics.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sector">Sector</label>
        <select id="sector" name="sector" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.sectors.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      

      <div className="filter-group">
        <label htmlFor="region">Region</label>
        <select id="region" name="region" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.regions.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="pestle">PEST</label>
        <select id="pestle" name="pestle" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.pests.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="source">Source</label>
        <select id="source" name="source" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.sources.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.countries.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="end_year">End Year</label>
        <select id="end_year" name="end_year" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.endYears.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="start_year">Start Year</label>
        <select id="start_year" name="start_year" onChange={handleChange}>
          <option value="">-- All --</option>
          {filterOptions.startYears.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

    </aside>
  );
};

export default Filters;