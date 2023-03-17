import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import "./RatingDiv.css";

const RatingDiv = ({ rating, onRatingClick }) => {
  return (
    <div className="rating-div">
      <div className="rating-icons">
        {[...Array(5)].map((_, index) => {
          return rating >= index + 1 ? (
            <BsSuitHeartFill
              key={index}
              id={`rating-${index + 1}`}
              className="rating-icon-filled"
              onClick={() => onRatingClick(index + 1)}
            />
          ) : (
            <BsSuitHeart
              key={index}
              id={`rating-${index + 1}`}
              className="rating-icon"
              onClick={() => onRatingClick(index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingDiv;
