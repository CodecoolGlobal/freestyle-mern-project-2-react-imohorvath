import "./ContactUsForm.css";
import React, { useState, useEffect } from "react";

const ContactUsForm = ({ onSave }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    console.log(isSubscribed);
  }, [isSubscribed]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contact = Object.fromEntries(formData.entries());
    contact.subscribe = isSubscribed;
    console.log(contact);
    onSave(contact);
  };

  return (
    <>
      <div className="contact-header">
        <h2>How can we help you?</h2>
      </div>
      <form id="contactForm" className="contact-form" onSubmit={onSubmit}>
        <div className="inputDiv">
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>

        <div className="inputDiv">
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>

        <div className="inputDiv">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" required />
        </div>

        <div className="inputDiv">
          <label htmlFor="phone">Enter your phone number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="message">Your message for us:</label>
          <input type="text" name="message" required />
        </div>

        <div className="inputDiv">
          <label htmlFor="subscribeNews">Subscribe to newsletter?</label>
          <input
            type="checkbox"
            id="subscribeNews"
            name="subscribe"
            defaultChecked={false}
            onChange={(e) => setIsSubscribed(e.target.checked)}
          />
        </div>

        <div className="inputDiv">
          <input type="submit" />
        </div>
      </form>
    </>
  );
};

export default ContactUsForm;
