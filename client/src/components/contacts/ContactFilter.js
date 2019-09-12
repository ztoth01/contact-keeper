import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filterContact, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (!filtered) {
      text.current.value = "";
    }
  }, [contacts, filtered]);

  const onChange = e => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  const dynamicStyle =
    contacts === null || contacts.length === 0
      ? { display: "none" }
      : { display: "block" };

  return (
    <form style={dynamicStyle}>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts..."
        name="search"
        onChange={onChange}
        className="filter-field"
      />
    </form>
  );
};

export default ContactFilter;
