import { useState, useEffect } from "react";
import CityItem from "../../Components/CityItem";
import CitySearch from "../../Components/CitySearch";
import Footer from "../../Components/Footer";
import Loading from "../../Components/Loading";

import "./Citylist.css";

const Citylist = () => {
  const [cityList, setCityList] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/cities")
      .then((res) => res.json())
      .then((result) => {
        setCityList(result);
        setLoading(false);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from /api/cities:${error}`)
      );
  }, []);

  if (loading) {
    return <Loading />;
  }

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
            <div className="citylist-header-empty">
            </div>
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
