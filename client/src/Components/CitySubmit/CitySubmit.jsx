import { useState } from "react";
import RatingDiv from "../RatingDiv";

import "./CitySubmit.css";

const CitySubmit = ({ city, onSubmit, isOnBucketlist }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isMessage, setIsMessage] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      city: city._id,
      comment,
      rating,
    };

    fetch("/api/bucketlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

  return isOnBucketlist ? (
    <div className="city-submit">
      <p>
        This city is already on your bucketlist if you will add it it will
        modify the current item on the bucketlist
      </p>
      <div className="message-for-user-buttons">
        <button
          className="message-for-user-button"
          onClick={() => setIsMessage(false)}
        >
          I want to add anyway
        </button>
        <button className="message-for-user-button">Cancel for now</button>
      </div>
    </div>
  ) : (
    <div className="city-submit">
      <div className="comment-input-container">
        <div className="comment-div">
          <input
            type="text"
            className="comment-input"
            value={comment}
            placeholder="Write your comment here..."
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <RatingDiv rating={rating} handleRatingClick={handleRatingClick} />
        <div className="submit-button-div">
          <button className="submit-to-favs" onClick={handleSubmit}>
            Add to list
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySubmit;
