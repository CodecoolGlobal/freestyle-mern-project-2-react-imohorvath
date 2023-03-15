import "./ContactUs.css";
import { useState, useEffect } from "react";
import ContactUsForm from "../../Components/ContactUsForm";
import ThankYou from "../../Components/ThankYou";

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createContact = (contact) => {
    return fetch("api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((res) => res.json());
  };

  const handlecreateContact = (contact) => {
    createContact(contact).then(() => {
      setIsSubmitted(true);
    });
  };

  const onAnotherMessage = () => {
    setIsSubmitted(false)
  }

  return (
    <>
      {isSubmitted ? (
        <ThankYou onButtonClick={onAnotherMessage}/>
      ) : (
        <ContactUsForm onSave={handlecreateContact} />
      )}
    </>
  );
};

export default ContactUs;
