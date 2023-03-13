import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import './RatingDiv.css';

const RatingDiv = ({ rating, handleRatingClick }) => {
  return (
    <div className="rating-div">
      {/* <p>Rating</p> */}
      <div className="rating-icons">
        {[...Array(5)].map((_, index) => {
          return rating >= index + 1 ? (
            <BsSuitHeartFill
              id={`rating-${index + 1}`}
              className="rating-icon-filled"
              onClick={() => handleRatingClick(index + 1)}
            />
          ) : (
            <BsSuitHeart
              id={`rating-${index + 1}`}
              className="rating-icon"
              onClick={() => handleRatingClick(index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingDiv;
