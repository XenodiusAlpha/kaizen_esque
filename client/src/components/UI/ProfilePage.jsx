import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// This will be used later.
// import SideMenu from "../miniComponents/ProfileSideMenu";
import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";
import { UserDashboard } from "../miniComponents/UserDashboard";

function IsInstructor(IsInstructor) {
  if (IsInstructor) {
    console.log("Is instructor");
    return UserDashboard;
  } else if (!IsInstructor) {
    console.log("Not Instructor");
  }
}

export default function ProfilePage() {
  return <IsInstructor IsInstructor={true} />;
}
