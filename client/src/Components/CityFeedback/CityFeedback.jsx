import "./CityFeedback.css";

const CityFeedback = ({ onCancel, onAdd }) => {
  return (
    <div className="city-submit">
      <p>This city is already on your bucketlist.</p>
      <p>
        If you click on ADD ANYWAY, you will modify the current item on the
        bucketlist.
      </p>
      <div className="message-for-user-buttons">
        <button className="message-for-user-button" onClick={onAdd}>
          ADD ANYWAY
        </button>
        <button className="message-for-user-button" onClick={onCancel}>
          CANCEL FOR NOW
        </button>
      </div>
    </div>
  );
};

export default CityFeedback;
