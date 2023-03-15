import "./CityFilter.css";
import React, { useState, useEffect } from 'react';

const CityFilter = ({filterValue, countries, handleFilter}) => {

  return (
    <div className="city-filter">
      <div className="city-filter-input">
        <label htmlFor="country-dropdown">Search for a country...</label>
        <input
          className="country-dropdown"
          type="text"
          id="country-dropdown"
          list="countryList"
          value={filterValue}
          onChange={(e) => {
            handleFilter(e);
          }}
        />
        <datalist id="countryList">
          {countries.map((country, index) => 
            <option key={index} value={country}>{country}</option>
          )}
        </datalist>
      </div>
    </div>
  );
};

export default CityFilter;
