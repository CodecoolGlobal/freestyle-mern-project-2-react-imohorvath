import "./ContactUs.css";
import { useState, useEffect } from "react";

const ContactUs = () => {
  return (
    <form id="contactForm" className="contact-form">
      <div className="inputDiv">
        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" name="firstName" />
      </div>

      <div className="inputDiv">
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" name="lastName" />
      </div>

      <div className="inputDiv">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
      </div>

      <div className="inputDiv">
        <label htmlFor="phone">Enter your phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{3}"
          required
        />
      </div>

      <div className="inputDiv">
        <label htmlFor="message">Your message for us:</label>
        <input type="text" name="message" />
      </div>

      <div className="inputDiv">
        <label htmlFor="subscribeNews">Subscribe to newsletter?</label>
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
