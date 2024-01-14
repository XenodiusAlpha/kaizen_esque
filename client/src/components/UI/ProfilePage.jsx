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

      <EnrolledCourses className="ProfileCourse" />
    </div>
  );
}
