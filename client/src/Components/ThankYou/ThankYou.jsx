import "./ThankYou.css";

const ThankYou = ({ onButtonClick }) => {

  return (
    <div className="thankyouDiv">
      <h2>Thank You for your contacting us!</h2>
      <button id="thankYouButton" onClick={() => onButtonClick()}>Send another message</button>
    </div>
  );
};

export default ThankYou;
