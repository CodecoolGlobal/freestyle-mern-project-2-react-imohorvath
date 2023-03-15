import "./ContactUs.css";
import { useState, useEffect } from "react";
import ContactUsForm from "../../Components/ContactUsForm";

const ContactUs = () => {

  const createContact = (contact) => {
    return fetch("api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((res) => res.json());
  }

  const handlecreateContact = (contact) => {
    createContact(contact)
  }

  return (
    <>
    <div className="contact-header">
      <h2>How can we help you?</h2>
    </div>
    <ContactUsForm onSave={handlecreateContact}/>
    </>
  );
};

export default ContactUs;
