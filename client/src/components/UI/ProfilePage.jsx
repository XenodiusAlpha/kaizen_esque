import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// This will be used later.
// import SideMenu from "../miniComponents/ProfileSideMenu";
import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";
import UserDashboard from "../miniComponents/UserDashboard";
import InstructorDashboard from "../miniComponents/InstructorDashboard";

function IsInstructor() {
  const role = JSON.parse(sessionStorage.getItem("user")).role;
  if (role === "instructor") {
    return <InstructorDashboard />;
  } else {
    return <UserDashboard />;
  }
}

export default function ProfilePage() {
  return <IsInstructor />;
}
