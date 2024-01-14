import React, { useState } from "react";
import { Link } from "react-router-dom";
import EnrolledCourses from "../miniComponents/EnrolledCourses";
// This will be used later.
import SideMenu from "../miniComponents/ProfileSideMenu";
import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";
import Dashboard from "../miniComponents/Dashboard";
import Settings from "../miniComponents/SettingsPage";

export default function ProfilePage() {
  return (
    <div className="ProfileContainer">
      <SideMenu />
      <EnrolledCourses className="ProfileCourse hidden" />
      <Dashboard className="ProfileDash " />
      <Settings className="ProfileSettings hidden" />
    </div>
  );
}
