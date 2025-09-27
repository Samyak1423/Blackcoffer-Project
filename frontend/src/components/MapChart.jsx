// frontend/src/components/MapChart.jsx
import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ chartData }) => {
    const countryCounts = {};
    chartData.forEach(item => {
        if (item.country) {
            countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
        }
    });

    return (
        <div style={{ position: 'relative' }}>
            <h3 style={{ textAlign: 'center', color: '#1C352D' }}>Insights by Country</h3>
            <ComposableMap>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            const insightCount = countryCounts[countryName] || 0;
                            const isHighlighted = insightCount > 0;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    // --- THIS IS THE CHANGE ---
                                    // Add a unique anchor class for the tooltip
                                    data-tooltip-id="country-tooltip"
                                    data-tooltip-content={isHighlighted ? `${countryName}: ${insightCount} Insights` : ''}
                                    fill={isHighlighted ? "#A6B28F" : "#E9EAEA"}
                                    stroke="#FFFFFF"
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#F5C9B0", outline: "none", cursor: 'pointer' },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            {/* The Tooltip component itself, now with place="top" */}
            <Tooltip id="country-tooltip" place="top" effect="solid" />
        </div>
    );
};

export default MapChart;