import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  unstable_useViewTransitionState,
  useNavigate,
} from "react-router-dom";
import { LOGIN_USER } from "../../GraphQL/mutations";
import { useMutation } from "@apollo/client";
import "../../assets/css/background.css";

const Login = () => {
  const [isLoggedIn, SetisLoggedIn] = useState(false);

  const [userInfo, SetUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    typename: "",
    id: "",
    token: "",  
    role: "",
  });

  const [formInput, setformInput] = useState({
    email: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (isLoggedIn === true) {
      let userInfoJSON = JSON.stringify(userInfo);
      window.sessionStorage.setItem("user", userInfoJSON);
      window.sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      if (isLoggedIn) {
        navigate("/Profile");
      }
    }
  }, [userInfo, isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  //when the form is submited it updates the forminput vairable and
  //tries to do the login mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formInput) {
      const { data } = await login({
        variables: {
          email: formInput.email,
          password: formInput.password,
        },
      });

      SetUserInfo({
        ...userInfo,
        firstname: data.login.user.firstName,
        lastname: data.login.user.lastName,
        email: data.login.user.email,
        typename: data.login.user.__typename,
        id: data.login.user._id,
        token: data.login.token,
        role: data.login.user.role,
        signupDate:data.login.user.signupDate
      });

      console.log(data);
      //if data is presented to us from a successfull login, we will change the localstorage login var to true
      //and navigate to the /profile page

      SetisLoggedIn(true);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  // const handleBlurName = () => {
  //   var inputElement = document.getElementById("warningTextNameID");
  //   if (formInput.Username.trim() === "") {
  //     inputElement.classList.remove("hidden-element");
  //   } else {
  //     inputElement.classList.add("hidden-element");
  //   }
  // };

  // const handleBlurPassword = () => {
  //   var inputElement = document.getElementById("warningTextpassword");
  //   if (formInput.Password.trim() === "") {
  //     inputElement.classList.remove("hidden-element");
  //   } else {
  //     inputElement.classList.add("hidden-element");
  //   }
  // };

  return (
    <div className=" flex-container-row center-content">
      <div className="lbox-style flex-container-columns Outlet-Style center-content background">
        <div className="flex-container-columns center-content">
          <h2 className="wt">Login</h2>
        </div>

        <form className="flex-container-columns" onSubmit={handleSubmit}>
          <p className="wt">Email:</p>
          <label>
            <input
              id="userInputEmail"
              type="text"
              name="email"
              // value={formInput.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              // onBlur={handleBlurName}
            />
            <h4
              id="warningTextNameID"
              className="wt warningTextForm hidden-element"
            >
              *Please insert an email
            </h4>
          </label>

          <p className="wt">Password:</p>
          <label id="userInputPassword">
            <input
              type="password"
              name="password"
              // value={formInput.Password}
              onChange={handleChange}
              placeholder="Enter your Password"
              // onBlur={handleBlurPassword}
            />
            <h4
              id="warningTextpassword"
              className="wt warningTextForm hidden-element"
            >
              *Please insert a password
            </h4>
          </label>

          <div className="flex-container-row">
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

          <button className="button-Style" type="submit">
            Log in
          </button>
        </form>
        <Link to="/Signup">
          <p className="signUp_Link dpl dpt wt">New to KaizenEsque? Sign up!</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

// Reference for checkbox
// https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
