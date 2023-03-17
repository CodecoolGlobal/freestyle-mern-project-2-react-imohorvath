import { useState } from "react";
import RatingDiv from "../RatingDiv";

import "./CitySubmit.css";

const CitySubmit = ({ city, onSubmit, bucketListId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCreateNew = (e) => {
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

  const handleModify = (e) => {
    e.preventDefault();

    const body = {
      comment,
      rating,
    };

    fetch(`/api/bucketlist/${bucketListId}`, {
      method: "PATCH",
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

  const handleRatingClick = (rating) => {
    setRating(rating);
  }

  return (
    <div className="city-submit">
      {bucketListId && (
        <div className="message-for-user">
          <p>
            If you click on ADD ANYWAY, you will modify the current item on the
            bucketlist with the given parameters.
          </p>
          <p>Press Cancel to close this card.</p>
        </div>
      )}
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
        <RatingDiv rating={rating} onRatingClick={handleRatingClick} />
        <div className="submit-button-div">
          <button className="submit-to-favs" onClick={bucketListId ? handleModify : handleCreateNew}>
            {bucketListId ? "ADD ANYWAY" : "ADD TO LIST"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySubmit;
