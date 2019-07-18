import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Filter = () => {

  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (!filtered) {
      text.current.value = '';
    }
  })

  const onChange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <form>
      <input type="text" ref={text} placeholder="Filter Contacts..." name="search" onChange={onChange} />
    </form>
  )
}

export default Filter;
