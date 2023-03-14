import "./ContactUs.css";
import { useState, useEffect } from "react";

const ContactUs = () => {
  return (
    <form action="">
      <div className="inputDiv">
        <label htmlFor="">First name:</label>
        <input type="text" name="firstName" />
      </div>

      <div className="inputDiv">
        <label htmlFor="">Last name:</label>
        <input type="text" name="lastName" />
      </div>

      <div className="inputDiv">
        <label htmlFor="">Email:</label>
        <input type="text" name="email" />
      </div>

      <div className="inputDiv">
        <label for="phone">Enter your phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{3}"
          required
        />
        </div>

        <div className="inputDiv">
          <label htmlFor="">Your message for us:</label>
          <input type="text" name="" />
        </div>

        <div className="inputDiv">
          <label for="subscribeNews">Subscribe to newsletter?</label>
          <input
            type="checkbox"
            id="subscribeNews"
            name="subscribe"
            value="newsletter"
          />
        </div>

        <div className="inputDiv">
          <input type="submit" />
        </div>

    </form>
  );
};

export default ContactUs;
