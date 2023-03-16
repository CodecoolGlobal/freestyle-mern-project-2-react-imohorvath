import { useState, useEffect } from "react";

import BucketlistItem from "../../Components/BucketlistItem";
import Footer from "../../Components/Footer";
import Loading from "../../Components/Loading";

import "./Bucketlist.css";

const fetchBucketlist = () => {
  return fetch("/api/bucketlist").then((res) => res.json());
};

const Bucketlist = () => {
  const [bucketlist, setBucketlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBucketlist().then((bucketlist) => {
      setBucketlist(bucketlist);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const deleteBucketlistItem = (id) => {
    fetch(`/api/bucketlist/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    setBucketlist((items) => {
      return items.filter((item) => item._id !== id);
    });
  };

  const updateBucketlistItem = (id, comment) => {
    const body = {
      comment,
    };

    fetch(`/api/bucketlist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((city) => {
        setBucketlist(list => list.map(fav => {
          if (city._id !== fav._id) {
            return fav;
          }

          return {
            ...fav,
            ...city
          };
        }))

        /*setLoading(true);
        fetchBucketlist().then((bucketlist) => {
          setBucketlist(bucketlist);
          setLoading(false);
        });*/
      });
  };

  //Itt kell headers? vagy body?
  const changeBucketlistItem = (id) => {
    fetch(`/api/bucketlist/update-visited/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(true);
        fetchBucketlist().then((bucketlist) => {
          setBucketlist(bucketlist);
          setLoading(false);
        });
      });
  };

  return (
    <>
      <div className="bucketlist-container">
        <div className="bucketlist">
          <div className="bucketlist-header">
            <div className="bucketlist-row-checkbox"></div>
            <div className="bucketlist-header-text">
              <div className="bucketlist-header-text-item">
                <h3>City</h3>
              </div>
              <div className="bucketlist-header-text-item">
                <h3>Country</h3>
              </div>
              <div className="bucketlist-header-text-item">
                <h3>Rating</h3>
              </div>
              <div className="bucketlist-row-buttons"></div>
              <div className="bucketlist-row-buttons"></div>
            </div>
          </div>
          {bucketlist.map((destination) => (
            <BucketlistItem
              destination={destination}
              key={destination._id}
              onDelete={deleteBucketlistItem}
              onUpdate={updateBucketlistItem}
              onChange={changeBucketlistItem}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bucketlist;
