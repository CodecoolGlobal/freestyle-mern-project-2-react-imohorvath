import { useState } from "react";

import { BsSuitHeartFill } from "react-icons/bs";
// import { TbSquare, TbCheckbox } from "react-icons/tb";

import "./BucketlistItem.css";

const BucketlistItem = ({ destination, deleteItem, updateItem }) => {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [newComment, setNewComment] = useState(destination.comment);
  
  const changeCommentField = () => {
    setUpdateClicked(!updateClicked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewComment(newComment);
    setUpdateClicked(!updateClicked);

    updateItem(destination._id, newComment);
  };

  return (
    <div className="bucketlist-row">
      {/* <div className="bucketlist-row-checkbox">
        <TbSquare className="checkbox" />
      </div> */}
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
            <BsSuitHeartFill
              key={index}
              id="rating-3"
              className="rating-icon-filled"
            />))}
          </div>
          <div className="bucketlist-row-buttons">
            {updateClicked ? (
              <button className="function-button" onClick={changeCommentField}>
                Cancel
              </button>
            ) : (
              <button className="function-button" onClick={changeCommentField}>
                Update
              </button>
            )}
          </div>
          <div className="bucketlist-row-buttons">
            <button
              className="function-button"
              onClick={() => deleteItem(destination._id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="bucketlist-row-text-bottom">
          {updateClicked ? (
            <>
              <input
                className="comment-update-input"
                value={newComment}
                type="text"
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="comment-update-buttons">
                <button className="comment-submit-button" onClick={handleSubmit}>
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
