//Need import of assets from back-end to construct front end here. Create function to pull Json

import React, { useState } from 'react';
import thumbnail from '../../assets/img/PlaceholderImage.png';
import { Link } from 'react-router-dom';
import '../../assets/css/usersettings.css'

export default function UserSettings(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(props.username);
  const [editedDescription, setEditedDescription] = useState(props.userDescription);


  const handleEditClick = () => {
    setIsEditing(true);
  };
  //Above toggles editing mode

  const handleSaveClick = () => {
    // Need to understand how to pass info. JSON?
    console.log('Edited name:', editedUsername);
    console.log('Edited Description:', editedDescription);

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUsername(props.username);
    setEditedDescription(props.userDescription);

    setIsEditing(false);
  };

  return (
    <div id={props.id} className={props.className}>
        <div className='flex-container-row'>
        <div className='flex-container-columns profilebox-style'>
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
              <h2 className='lessonTitle'>{editedUsername}</h2>
              <img className='lessonthumbnail' src={thumbnail} alt="lessonthumbnail" />
            </>
          )}
                  <p>props.AccountType</p>
        <p>{isEditing ? editedDescription : 'props.userDescription'}</p>
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
