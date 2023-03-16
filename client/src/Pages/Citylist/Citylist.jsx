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
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

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

  useEffect(() => {
    if (!sortColumn) {
      return;
    }

    setLoading(true);
    fetch(`api/cities?${sortColumn}=${sortOrder}`)
    .then((res) => res.json())
    .then((result) => {
      setCityList(result);
      setOriginalList(result);
      setLoading(false);
    })
    .catch((error) =>
      console.log(`An error occurred at fetching from /api/cities:${error}`)
    );
  }, [sortColumn, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  const handleFilter = (e) => {
    const { target: { value } } = e;
    setFilterValue(value);
    const filtered = originalList.filter((city) =>
      city.country.toLowerCase().includes(value.toLowerCase())
    );
    setCityList(filtered);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getArrowIcon = (column) => {
    if (sortColumn === column) {
      if (sortOrder === "asc") {
        return "▲";
      } else {
        return "▼";
      }
    } else {
      return "▽";
    }
  };

  return (
    <>
      <div className="city-container">
        <CitySearch
          searchValue={searchValue}
          onSearch={(e) => handleFilter(e)}
        />
        <CityFilter
          filterValue={filterValue}
          countries={countryList}
          onFilter={(e) => handleFilter(e)}
        />
        <div className="city-list">
          <div className="citylist-header">
            <div className="citylist-header-item" onClick={() => handleSort("name")}>
              <h3>City {getArrowIcon("name")}</h3>
            </div>
            <div
              className="citylist-header-item"
              onClick={() => handleSort("country")}
            >
              <h3>Country {getArrowIcon("country")}</h3>
            </div>
            <div
              className="citylist-header-item"
              onClick={() => handleSort("reviews")}
            >
              <h3>Visitor reviews {getArrowIcon("reviews")}</h3>
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
