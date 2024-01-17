//Need import of assets from back-end to construct front end here. Create function to pull Json

import React, { useState, useEffect } from "react";
import thumbnail from "../../assets/img/PlaceholderImage.png";
import { Link } from "react-router-dom";
import "../../assets/css/usersettings.css";

export default function UserSettings(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState();
  const [currentUsername, setCurrentUsername] = useState(
    JSON.parse(sessionStorage.getItem("user")).firstname
  );

  const [editedDescription, setEditedDescription] = useState(
    props.userDescription
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };
  //Above toggles editing mode

  const handleSaveClick = () => {
    let data = JSON.parse(sessionStorage.getItem("user"));
    data.firstname = editedUsername;
    // Need to understand how to pass info. JSON?
    // console.log("Edited name:", editedUsername);
    // console.log("Edited Description:", editedDescription);

    setIsEditing(false);
    sessionStorage.setItem("user", JSON.stringify(data));
    console.log("Edited DATA", sessionStorage.getItem("user"));
    setCurrentUsername(editedUsername);
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
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="Username">{currentUsername}</h2>
            </>
          )}
          <p>props.AccountType</p>
          <p>{isEditing ? editedDescription : "props.userDescription"}</p>
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
