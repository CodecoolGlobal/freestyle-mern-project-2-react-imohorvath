import "./CitySearch.css"

const CitySearch = ({filterValue, handleSearch}) => {
  return (
    <div className="city-search">
    <input
      className="city-search-input"
      type="text"
      placeholder="Enter city name..."
      value={filterValue}
      onChange={handleSearch}
    />
    </div>
  );
};


export default CitySearch;
