import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { ADD_USER_MUTATION } from "../../GraphQL/mutations";

// Signup component
const Signup = () => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role set to 'user'
  });

  const [addUser] = useMutation(ADD_USER_MUTATION);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormInput((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInput.password !== formInput.confirmPassword) {
      console.error("Passwords do not match");

      window.alert("Passwords do not match");

      return;
    }

    try {
      const isRoleInstructor = formInput.role === "instructor";

      const { data } = await addUser({
        variables: {
          firstName: formInput.firstName,
          lastName: formInput.lastName,
          email: formInput.email,
          password: formInput.password,
          role: isRoleInstructor,
        },
      });

      if (isRoleInstructor) {
        navigate("/instructor-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex-container-row center-content">
      <div className="subox-style flex-container-columns Outlet-Style center-content background">
        <div className="flex-container-columns center-content">
          <h2 className="wt">Sign up</h2>
        </div>

        <form
          className="flex-container-columns center-content dpb dpt"
          onSubmit={handleSubmit}
        >
          {/* First Name Input */}
          <label className="wt">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formInput.firstName}
            onChange={handleChange}
            placeholder="Enter your First Name"
          />

          {/* Last Name Input */}
          <label className="wt">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formInput.lastName}
            onChange={handleChange}
            placeholder="Enter your Last Name"
          />

          {/* Email Input */}
          <label className="wt">Email:</label>
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />

          {/* Password Input */}
          <label className="wt">Password:</label>
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          />

          {/* Confirm Password Input */}
          <label className="wt">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formInput.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your Password"
          />

          {/* Role Selection */}
          <div className="role-selection radio-group">
            <label className="radio-label">
              <input
                className="radio-input"
                type="radio"
                name="role"
                value="user"
                checked={formInput.role === "user"}
                onChange={handleChange}
              />
              Sign up as User
            </label>
            <label className="radio-label">
              <input
                className="radio-input"
                type="radio"
                name="role"
                value="instructor"
                checked={formInput.role === "instructor"}
                onChange={handleChange}
              />
              Sign up as Instructor
            </label>
          </div>
          <hr></hr>

          {/* Submit Button */}

          <button className="button-Style" type="submit">
            Sign up
          </button>
        </form>

        <Link to="/Login">
          <p className="signUp_Link dpl dpt wt">
            Already have an account? Sign in!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
