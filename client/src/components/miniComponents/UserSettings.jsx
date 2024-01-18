//Need import of assets from back-end to construct front end here. Create function to pull Json

import React, { useState, useEffect } from "react";
import thumbnail from "../../assets/img/PlaceholderImage.png";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../../GraphQL/mutations";
import "../../assets/css/usersettings.css";
import UserInfo from "../miniComponents/UserInfo";

export default function UserSettings(props) {
  const [isEditing, setIsEditing] = useState(false);

  // useStates for firstname, lastname, and email
  const [firstname, setFirstname] = useState(
    JSON.parse(sessionStorage.getItem("user")).firstname
  );
  const [lastname, setLastname] = useState(
    JSON.parse(sessionStorage.getItem("user")).lastname
  );
  const [email, setEmail] = useState(
    JSON.parse(sessionStorage.getItem("user")).email
  );

  const [editUser] = useMutation(EDIT_USER);

  // Toggles editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    let id = JSON.parse(sessionStorage.getItem("user")).id;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    setFirstname(firstName);
    setIsEditing(false);


    if (password) {
      const { data } = await editUser({
        variables: {
          id,
          firstName,
          lastName,
          email,
          password
        }
      });
      console.log(data.editUser);
    }
    else {
      const { data } = await editUser({
        variables: {
          id,
          firstName,
          lastName,
          email
        }
      });
      console.log(data.editUser);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div id={props.id} className={props.className}>
      <div className="flex-container-row">
        <div className="flex-container-columns profilebox-style">
          {isEditing ? (
            <>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
              />
            </>
          ) : (
            <div className="parentContainer">
            <div className="addbg">
              <UserInfo/>
              <div className="flex-container-row">
              <h2 className="dpl wt">{firstname}</h2>
              <hr  />
              <h2 className="dpl wt">{lastname}</h2>
              </div>
              <p className="dpl wt">{email}</p>
            </div>
            </div>
          )}
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
