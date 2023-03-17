import "./CityFilter.css";

const CityFilter = ({filterValue, countries, onFilter}) => {

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
            onFilter(e);
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
