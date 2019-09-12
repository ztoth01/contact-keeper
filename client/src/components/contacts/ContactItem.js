import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import PropTypes from "prop-types";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const {
    deleteContact,
    clearCurrentContact,
    setCurrentContact
  } = contactContext;

  const removeContact = () => {
    deleteContact(_id);
    clearCurrentContact();
  };

  return (
    <div className="card">
      <h3 className="text-primary text-left">
        {name}
        {""}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" />
            <a href={`mailto:${email}`} target="_top">
              {" "}
              {email}
            </a>
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" />
            <a href={`tel:${phone}`}> {phone}</a>
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrentContact(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={removeContact}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
