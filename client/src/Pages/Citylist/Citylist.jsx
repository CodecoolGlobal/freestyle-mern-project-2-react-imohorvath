import { useState, useEffect } from "react";
import CityItem from "../../Components/CityItem";
import CitySearch from "../../Components/CitySearch";
import Footer from "../../Components/Footer";

import "./Citylist.css";

const Citylist = () => {
  const [cityList, setCityList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("/api/cities")
      .then((res) => res.json())
      .then((result) => {
        setCityList(result);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from /api/cities:${error}`)
      );
  }, []);

  function handleSearch(e) {
    setFilterValue(e.target.value);
    const filtered = cityList.filter((city) =>
      city.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCityList(filtered);
  }

  return (
    <>
      <div className="city-container">
        <CitySearch
          filterValue={filterValue}
          handleSearch={(e) => handleSearch(e)}
        />
        <div className="city-list">
          {cityList.map((city, index) => (
            <CityItem city={city} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Citylist;
