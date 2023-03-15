import "./CitySearch.css"

const CitySearch = ({searchValue, handleSearch}) => {
  return (
    <div className="city-search">
    <input
      className="city-search-input"
      type="text"
      placeholder="Enter city name..."
      value={searchValue}
      onChange={handleSearch}
    />
    </div>
  );
};


export default CitySearch;
