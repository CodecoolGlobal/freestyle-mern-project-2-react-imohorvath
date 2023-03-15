import { useState, useEffect } from "react";
import CityItem from "../../Components/CityItem";
import CitySearch from "../../Components/CitySearch";
import Footer from "../../Components/Footer";
import Loading from "../../Components/Loading";
import CityFilter from "../../Components/CityFilter";

import "./Citylist.css";

const createCountryList = (cityList) => {
  return [...new Set(cityList.map((city) => city.country))];
};

const Citylist = () => {
  const [cityList, setCityList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/cities")
      .then((res) => res.json())
      .then((result) => {
        setCityList(result);
        setOriginalList(result);
        return result;
      })
      .then((result) => {
        const countrylist = createCountryList(result);
        setCountryList(countrylist);
        setLoading(false);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from /api/cities:${error}`)
      );
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const filtered = originalList.filter((city) =>
      city.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCityList(filtered);
  };

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    const filtered = originalList.filter((city) =>
      city.country.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCityList(filtered);
  };

  return (
    <>
      <div className="city-container">
        <CitySearch
          searchValue={searchValue}
          handleSearch={(e) => handleSearch(e)}
        />
        <CityFilter
          filterValue={filterValue}
          countries={countryList}
          handleFilter={(e) => handleFilter(e)}
        />
        <div className="city-list">
          <div className="citylist-header">
            <div className="citylist-header-item">
              <h3>City</h3>
            </div>
            <div className="citylist-header-item">
              <h3>Country</h3>
            </div>
            <div className="citylist-header-item">
              <h3>Visitor reviews</h3>
            </div>
            <div className="citylist-header-empty"></div>
          </div>
          {cityList.map((city) => (
            <CityItem city={city} key={city._id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Citylist;
