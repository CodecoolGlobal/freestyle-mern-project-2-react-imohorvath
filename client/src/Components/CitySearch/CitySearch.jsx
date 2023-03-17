import "./CitySearch.css"

const CitySearch = ({searchValue, onSearch}) => {
  return (
    <div className="city-search">
    <input
      className="city-search-input"
      type="text"
      placeholder="Enter city name..."
      value={searchValue}
      onChange={onSearch}
    />
    </div>
  );
};


export default CitySearch;
