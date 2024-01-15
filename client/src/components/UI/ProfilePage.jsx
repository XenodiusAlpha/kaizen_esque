import React from 'react';
import profileimage from '../../assets/img/LogoNew.png'
import userDisplayName from '../../assets/img/PlaceholderImage.png'
// Above will path to function to return userName based on Token
import userCourses from '../../assets/img/PlaceholderImage.png'
//Above will have the courses that the users signed up for
import { Link } from 'react-router-dom';
// This will be used later.


export default function ProfilePage(){
    return (
      <div className='ProfilePageFlex footer-Style'>

        <div className='flex-container-columns dpr'>
        <img className='ProfileIconBorder' src={profileimage} alt="ProfileImage" />
        <p>{userDisplayName}</p>
        </div>
        <div className='box-style right-element'>
          {userCourses}
        </div>
      </div>
    );
  }
