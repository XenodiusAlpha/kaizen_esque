import React, { useState, useEffect } from "react";
import EnrolledCourses from "../miniComponents/EnrolledCourses";
import UserInfo from "../miniComponents/UserInfo";
import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";
import UserSettings from "../miniComponents/UserSettings.jsx";
export default function UserDashboard() {
  //This function is just for setting the visibility of each area of the dashboard -JKD
  const SetVis = (name) => {
    const Dashboard = document.querySelector(".ProfileDash");
    const Settings = document.querySelector(".ProfileSettings");
    const Courses = document.querySelector(".EnrolledCourses");

    if (name === "dash") {
      Dashboard.setAttribute("id", "");
      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "hidden");
      console.log("Dash");
    } else if (name === "settings") {
      Dashboard.setAttribute("id", "hidden");
      Settings.setAttribute("id", "");
      Courses.setAttribute("id", "hidden");
      console.log("settings");
    } else if (name === "courses") {
      Dashboard.setAttribute("id", "hidden");
      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "Vis");
      console.log("courses");
    }
  };

  return (
    <div className="ProfileContainer">
      <div className="SideMenu">
        <button onClick={() => SetVis("dash")}>Dashboard</button>
        <button onClick={() => SetVis("settings")}>Settings </button>
        <button onClick={() => SetVis("courses")}>Enrolled Courses</button>
      </div>
      <div className="ContentArea">
        <EnrolledCourses className="ProfileEnrolled" id="hidden" />
        <UserInfo className="ProfileDash" id="" />
        <UserSettings className="ProfileSettings" id="hidden" />
      </div>
    </div>
  );
}
