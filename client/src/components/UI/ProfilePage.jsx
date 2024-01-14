import React, { useState } from "react";
import { Link } from "react-router-dom";
import EnrolledCourses from "../miniComponents/EnrolledCourses";
// This will be used later.
import SideMenu from "../miniComponents/ProfileSideMenu";
import "../../assets/css/profile.css";

export default function ProfilePage() {
  return (
    <div className="ProfileContainer">
      <SideMenu className="SideMenuContainer" />

<<<<<<< HEAD
      <EnrolledCourses className="ProfileCourse" />
    </div>
  );
}
=======
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
>>>>>>> 5308efc0d5c24174f2eb782713675d3de8619273
