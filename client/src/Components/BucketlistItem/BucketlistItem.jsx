import { useState } from "react";
import { IconContext } from "react-icons";
import { BsSuitHeartFill } from "react-icons/bs";
import { TbSquare, TbCheckbox } from "react-icons/tb";

import "./BucketlistItem.css";

const BucketlistItem = ({ destination, onDelete, onUpdate, onChange }) => {
  const [showUpdateField, setShowUpdateField] = useState(false);
  const [newComment, setNewComment] = useState(destination.comment);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewComment(newComment);
    setShowUpdateField(!showUpdateField);

    onChange(destination._id, newComment, 'comment');
  };

  return (
    <div
      className={
        destination.visited ? "bucketlist-row checked" : "bucketlist-row"
      }
    >
      <div className="bucketlist-row-checkbox">
        {destination.visited ? (
          <TbCheckbox
            className="checkbox"
            onClick={() => onChange(destination._id, !destination.visited, 'visited')}
          />
        ) : (
          <TbSquare
            className="checkbox"
            onClick={() => onChange(destination._id, !destination.visited, 'visited')}
          />
        )}
      </div>
      <div className="bucketlist-row-text">
        <div className="bucketlist-row-text-top">
          <div className="bucketlist-row-element">
            <p>{destination.city.name}</p>
          </div>
          <div className="bucketlist-row-element">
            <p>{destination.city.country}</p>
          </div>
          <div className="bucketlist-row-element">
            {[...Array(destination.rating)].map((_, index) => (
              <IconContext.Provider
                key={index}
                value={
                  destination.visited
                    ? { color: "#afafaf" }
                    : { color: destination.city.color }
                }
              >
                <BsSuitHeartFill className="rating-heart" />
              </IconContext.Provider>
            ))}
          </div>
          <div className="bucketlist-row-buttons">
            {showUpdateField ? (
              <button className="function-button" onClick={() => setShowUpdateField(!showUpdateField)}>
                Cancel
              </button>
            ) : (
              <button
                className={
                  destination.visited ? "disabled-button" : "function-button"
                }
                disabled={destination.visited ? true : false}
                onClick={() => setShowUpdateField(!showUpdateField)}
              >
                Update
              </button>
            )}
          </div>
          <div className="bucketlist-row-buttons">
            <button
              className="function-button"
              onClick={() => onDelete(destination._id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="bucketlist-row-text-bottom">
          {showUpdateField ? (
            <>
              <input
                className="comment-update-input"
                value={newComment}
                type="text"
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="comment-update-buttons">
                <button
                  className="comment-submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <p>"{destination.comment}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BucketlistItem;
