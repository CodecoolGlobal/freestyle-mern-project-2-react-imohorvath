import { useState } from "react";
import RatingDiv from "../RatingDiv";

import "./CitySubmit.css"

const CitySubmit = ({ name, country, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const data = { name, country, comment, rating };

    fetch("/api/bucketlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setComment("");
    onSubmit();
  }

  function handleRatingClick(rating) {
    setRating(rating);
  }

  return (
    <div className="city-submit">
      <div className="comment-div">
        <input
          type="text"
          className="comment-input"
          value={comment}
          placeholder="Write your comment here..."
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <RatingDiv rating={rating} handleRatingClick={handleRatingClick}/>
      <div className="submit-button-div">
        <button className="submit-to-favs" onClick={handleSubmit}>
          Add to list
        </button>
      </div>
    </div>
  );
};

export default CitySubmit;
