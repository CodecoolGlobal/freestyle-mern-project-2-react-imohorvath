import "./ContactUs.css";
import { useState, useEffect } from "react";
import ContactUsForm from "../../Components/ContactUsForm";

const ContactUs = () => {
  return (
    <>
    <div className="contact-header">
      <h2>How can we help you?</h2>
    </div>
    <ContactUsForm />
    </>
  );
};

export default ContactUs;
