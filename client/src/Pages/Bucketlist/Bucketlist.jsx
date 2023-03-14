import { useState, useEffect } from "react";

import BucketlistItem from "../../Components/BucketlistItem";
import Footer from "../../Components/Footer";

import "./Bucketlist.css";

const Bucketlist = () => {
  const [bucketlist, setBucketlist] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [newCommentSubmitted, setNewCommentSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/bucketlist")
      .then((res) => res.json())
      .then((result) => {
        setBucketlist(result);
      })
      .catch((error) =>
        console.log(
          `An error occurred at fetching from /api/bucketlist:${error}`
        )
      );
  }, [deleteClicked, newCommentSubmitted]);

  const deleteItem = (id) => {
    const body = { id };

    fetch("/api/bucketlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    setDeleteClicked(!deleteClicked);
  };

  const updateItem = (id, comment) => {
    const message = {
      id,
      comment,
    };

    fetch("/api/bucketlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    setNewCommentSubmitted(!newCommentSubmitted);
  };

  return (
    <>
      <div className="bucketlist-container">
        <div className="bucketlist">
          {bucketlist.map((destination) => (
            <BucketlistItem
              destination={destination}
              key={destination._id}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bucketlist;
