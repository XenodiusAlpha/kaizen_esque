import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [formInput, setformInput] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
    VerifyPassword: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlurFirstName = () => {
    var inputElement = document.getElementById("warningTextFirstNameID");
    if (formInput.Firstname.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurLastName = () => {
    var inputElement = document.getElementById("warningTextLastNameID");
    if (formInput.Password.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurEmail = () => {
    var inputElement = document.getElementById("warningTextEmailID");
    if (formInput.Email.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurPassWord = () => {
    var inputElement = document.getElementById("warningTextPasswordID");
    if (formInput.Password.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurConfirmPassWord = () => {
    var inputElement = document.getElementById("warningTextConfirmPasswordID");
    if (formInput.Password.trim() === handleBlurPassWord) {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
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
              value={formInput.name}
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
              value={formInput.password}
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
              type='text'
              name='password'
              value={formInput.Email}
              onChange={handleChange}
              placeholder="Enter your Password"
              onBlur={handleBlurPassWord}
            />
              <h4 id='warningTextPasswordID' className='wt warningTextForm hidden-element'>*Please insert a password</h4>
          </label>

          <p className='wt'>Confirm Password:</p>

          <label>
            <input
              type='text'
              name='confirmpassword'
              value={formInput.Email}
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

export default Login;