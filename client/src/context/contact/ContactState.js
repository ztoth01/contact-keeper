import React, { useReducer } from "react";
//import uuid from 'uuid';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = async newContact => {
    //newContact.id = uuid.v4();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/contacts", newContact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Cleat contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Set current contact
  const setCurrentContact = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  // Clear current contact
  const clearCurrentContact = () => dispatch({ type: CLEAR_CURRENT });

  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Filter contacts
  const filterContact = text =>
    dispatch({ type: FILTER_CONTACTS, payload: text });

  // Clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        error: state.error,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
