import { useState } from "react";
import CitySubmit from "../CitySubmit";
import CityDetailCard from "../CityDetailCard";

import "./CityItem.css";

const fetchBucketlist = async (cityid) => {
  const response = await fetch(`/api/bucketlist?cityid=${cityid}`);
  const result = await response.json();
  return result;
};

const CityItem = ({ city }) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isCityCardShown, setIsCityCardShown] = useState(false);
  const [isOnBucketlist, setIsonBucketlist] = useState(false);

  const handleDisplayCityCard = () => {
    setIsCityCardShown(!isCityCardShown);
  };

  const handleDisplaySubmitCard = async () => {
    setIsAddClicked(!isAddClicked);
    const result = await fetchBucketlist(city._id);
    // console.log(result);
    if (result === null) {
      return;
    } else {
      setIsonBucketlist(true);
    }
  }

  return (
    <>
      <div className="city-row">
        <div className="city-row-element">
          <p>{city.name}</p>
        </div>
        <div className="city-row-element">
          <p>{city.country}</p>
        </div>
        <div className="city-row-element city-row-element-reviews">
          <p>{city.reviews}</p>
        </div>
        <div className="city-row-buttons">
          {isCityCardShown ? (
            <button onClick={handleDisplayCityCard} className="function-button">
              Hide
            </button>
          ) : (
            <button onClick={handleDisplayCityCard} className="function-button">
              Show
            </button>
          )}
        </div>
        <div className="city-row-buttons">
          {isAddClicked ? (
            <button
              className="function-button"
              onClick={handleDisplaySubmitCard}
            >
              Cancel
            </button>
          ) : (
            <button
              className="function-button"
              onClick={handleDisplaySubmitCard}
            >
              Add
            </button>
          )}
        </div>
      </div>
      {isAddClicked && (
        <CitySubmit
          city={city}
          onSubmit={handleDisplaySubmitCard}
          isOnBucketlist={isOnBucketlist}
        />
      )}
      {isCityCardShown && <CityDetailCard city={city} />}
    </>
  );
};

export default CityItem;
