import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formInput, setformInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit button pressed')
    // Add logic for passing data here. 1. Pass user input 2. Switch user to logged in status. 2.5: Logged in status removes login option and replaces it with logout. Shows Profile option. Gives access to dashboards.

  };

  const handleBlurFirstName = () => {
    var inputElement = document.getElementById("warningTextFirstNameID");
    if (formInput.firstname.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurLastName = () => {
    var inputElement = document.getElementById("warningTextLastNameID");
    if (formInput.lastname.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurEmail = () => {
    var inputElement = document.getElementById("warningTextEmailID");
    if (formInput.email.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurPassWord = () => {
    var inputElement = document.getElementById("warningTextPasswordID");
    if (formInput.password.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurConfirmPassWord = () => {
    var inputElement = document.getElementById("warningTextConfirmPasswordID");
    if (formInput.confirmPassword.trim() === formInput.password.trim()) {
      inputElement.classList.add("hidden-element");
    } else {
      inputElement.classList.remove("hidden-element");
    }
  };

  return (
    <div className=' flex-container-row center-content'>
      <div className='subox-style flex-container-columns Outlet-Style center-content'>
        <div className='flex-container-columns center-content'>
        <h2 className='wt'>Sign up</h2>
        </div>

        <form className='flex-container-columns center-content dpb dpt'
        onSubmit={handleSubmit}>

          <p className='wt'>First Name:</p>

          <label>
            <input
              type='text'
              name='firstName'
              value={formInput.Firstname}
              onChange={handleChange}
              placeholder="Enter your First Name"
              onBlur={handleBlurFirstName}
            />
            <h4 id='warningTextFirstNameID' className='wt warningTextForm hidden-element'>*Please insert a first name</h4>
          </label>

          <p className='wt'>Last Name:</p>

          <label>
            <input
              type='text'
              name='lastName'
              value={formInput.Lastname}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              onBlur={handleBlurLastName}
            />
              <h4 id='warningTextLastNameID' className='wt warningTextForm hidden-element'>*Please insert a last name</h4>
          </label>

          <p className='wt'>Email:</p>

          <label>
            <input
              type='text'
              name='email'
              value={formInput.Email}
              onChange={handleChange}
              placeholder="Enter your Email"
              onBlur={handleBlurEmail}
            />
              <h4 id='warningTextEmailID' className='wt warningTextForm hidden-element'>*Please insert a Email</h4>
          </label>

          <p className='wt'>Password:</p>

          <label>
            <input
              type='password'
              name='password'
              value={formInput.Password}
              onChange={handleChange}
              placeholder="Enter your Password"
              onBlur={handleBlurPassWord}
            />
              <h4 id='warningTextPasswordID' className='wt warningTextForm hidden-element'>*Please insert a password</h4>
          </label>

          <p className='wt'>Confirm Password:</p>

          <label>
            <input
              type='password'
              name='confirmPassword'
              value={formInput.ConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              onBlur={handleBlurConfirmPassWord}
            />
              <h4 id='warningTextConfirmPasswordID' className='wt warningTextForm hidden-element'>*Passwords need to match</h4>
          </label>

          <button className='button-Style' type='submit'>Sign up</button>
        </form>
        <Link to="/Login">
          <p className='signUp_Link dpl dpt wt'>Already have an account? Sign in!</p>
          </Link>
      </div>
    </div>
  );
};

export default Signup;