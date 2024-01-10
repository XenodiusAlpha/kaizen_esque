import React from 'react';
import { useState } from "react";

const Contact = () => {
  const [formInput, setformInput] = useState({
    username: '',
    password: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlurName = () => {
    var inputElement = document.getElementById("warningTextNameID");
    if (formInput.name.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurPassword = () => {
    var inputElement = document.getElementById("warningTextpassword");
    if (formInput.email.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  return (
    <>
      <div className='lbox-style flex-container-columns'>
        <div className='flex-container-columns center-content'>
        <h2 className='wt'>Login</h2>
        </div>
        <form className='flex-container-columns center-content'
        onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              name='name'
              value={formInput.name}
              onChange={handleChange}
              placeholder="Enter your username"
              onBlur={handleBlurName}
            />
            <h4 id='warningTextNameID' className='wt warningTextForm hidden-element'>*Please insert a userame</h4>
          </label>
          <label>
            <input
              type='password'
              name='password'
              value={formInput.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              onBlur={handleBlurPassword}
            />
              <h4 id='warningTextpassword' className='wt warningTextForm hidden-element'>*Please insert a password</h4>
          </label>
          <button type='submit'>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Contact;