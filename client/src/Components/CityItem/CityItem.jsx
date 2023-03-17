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
  const [showSubmit, setShowSubmit] = useState(false);
  const [isCityCardShown, setIsCityCardShown] = useState(false);
  const [bucketListId, setBucketListId] = useState("");

  const toggleDisplayCityCard = () => {
    setIsCityCardShown(!isCityCardShown);
  };

  const handleSubmitToggle = async () => {
    if (!showSubmit) {
      const result = await fetchBucketlist(city._id);
      if (result !== null) {
        setBucketListId(result._id);
      }
    }
    setShowSubmit((curr) => !curr);
  };

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
          <button onClick={toggleDisplayCityCard} className="function-button">
            {isCityCardShown ? "Hide" : "Show"}
          </button>
        </div>
        <div className="city-row-buttons">
          <button className="function-button" onClick={handleSubmitToggle}>
            {showSubmit ? "Cancel" : "Add"}
          </button>
        </div>
      </div>
      {showSubmit && (
        <CitySubmit
          city={city}
          onSubmit={handleSubmitToggle}
          bucketListId={bucketListId}
        />
      )}
      {isCityCardShown && <CityDetailCard city={city} />}
    </>
  );
};

export default CityItem;
