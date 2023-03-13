import { useState } from "react";
import CitySubmit from "../CitySubmit";
import CityDetailCard from "../CityDetailCard";

import "./CityItem.css"

const CityItem = (props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const city = props.city;

  const handleClickOnButton = () => {
    setIsShown(!isShown);
  };

  function handleClick() {
    setIsAddClicked(!isAddClicked);
  }

  return (
    <>
      <div className="city-row" key={city.id}>
        <div className="city-row-element">
          <p>{city.name}</p>
        </div>
        <div className="city-row-element">
          <p>{city.country}</p>
        </div>
        <div className="city-row-buttons">
          {isShown ? (
            <button onClick={handleClickOnButton} className="function-button">Hide</button>
          ) : (
            <button onClick={handleClickOnButton} className="function-button">Show</button>
          )}
        </div>
        <div className="city-row-buttons">
        {isAddClicked ? (
          <button className="function-button" onClick={handleClick}>
            Cancel
          </button>
        ) : (
          <button className="function-button" onClick={handleClick}>
            Add
          </button>
        )}
        </div>
      </div>
      {isAddClicked && (
        <CitySubmit
          name={city.name}
          country={city.country}
          onSubmit={handleClick}
        />
      )}
      {isShown && <CityDetailCard city={city} />}
    </>
  );
};

export default CityItem;
