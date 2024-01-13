import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [formInput, setformInput] = useState({
    Username: '',
    Password: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleBlurName = () => {
    var inputElement = document.getElementById("warningTextNameID");
    if (formInput.Username.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  const handleBlurPassword = () => {
    var inputElement = document.getElementById("warningTextpassword");
    if (formInput.Password.trim() === '') {
      inputElement.classList.remove("hidden-element");
    } else {
      inputElement.classList.add("hidden-element");
    }
  };

  return (
    <div className=' flex-container-row center-content'>
      <div className='lbox-style flex-container-columns Outlet-Style center-content'>
        <div className='flex-container-columns center-content'>
        <h2 className='wt'>Login</h2>
        </div>

        <form className='flex-container-columns center-content dpb dpt'
        onSubmit={handleSubmit}>

          <p className='wt'>Email:</p>
          <label>
            <input
              type='text'
              name='name'
              value={formInput.name}
              onChange={handleChange}
              placeholder="Enter your email"
              onBlur={handleBlurName}
            />
            <h4 id='warningTextNameID' className='wt warningTextForm hidden-element'>*Please insert an email</h4>
          </label>

          <p className='wt'>Password:</p>
          <label>
            <input
              type='text'
              name='password'
              value={formInput.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              onBlur={handleBlurPassword}
            />
              <h4 id='warningTextpassword' className='wt warningTextForm hidden-element'>*Please insert a password</h4>
          </label>


      <div className='flex-container-row'>
          <input
          type="checkbox"
          id="topping"
          name="topping"
          value="Paneer"
          checked={isChecked}
          onChange={handleOnChange}
        />
      <div className="result dpl dpb wt">
        Log in as instructor {isChecked}
        </div>
      </div>


          <button className='button-Style' type='submit'>Log in</button>
        </form>
        <Link to="/Signup">
          <p className='signUp_Link dpl dpt wt'>New to KaizenEsque? Sign up!</p>
          </Link>
      </div>
    </div>
  );
};

export default Login;


// Reference for checkbox
// https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/