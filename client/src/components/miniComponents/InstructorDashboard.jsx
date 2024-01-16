import React, { useState, useEffect } from "react";
import EnrolledCourses from "../miniComponents/EnrolledCourses";
import UserInfo from "../miniComponents/UserInfo";
import SettingsPage from "../miniComponents/SettingsPage";
import MyCreatedCourses from "./MyCreatedCourses";
import createCourse from "./createCourse";
import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";

export default function InstructorDashboard() {
  //This function is just for setting the visibility of each area of the dashboard -JKD
  const SetVis = (name) => {
    const Dashboard = document.querySelector(".ProfileDash");
    const Settings = document.querySelector(".ProfileSettings");
    const EnrolledCourse = document.querySelector(".ProfileEnrolled");
    const MyCourses = document.querySelector(".MyCourses");
    if (name === "dash") {
      Dashboard.setAttribute("id", "Vis");
      Settings.setAttribute("id", "hidden");
      EnrolledCourse.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
      console.log("Dash");
    } else if (name === "settings") {
      Dashboard.setAttribute("id", "hidden");
      Settings.setAttribute("id", "Vis");
      EnrolledCourse.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
      console.log("settings");
    } else if (name === "Enrolled-courses") {
      Dashboard.setAttribute("id", "hidden");
      Settings.setAttribute("id", "hidden");
      EnrolledCourse.setAttribute("id", "Vis");
      MyCourses.setAttribute("id", "hidden");
      console.log("Enrolled Courses");
    } else if (name === "MyCourses") {
      Dashboard.setAttribute("id", "hidden");
      Settings.setAttribute("id", "hidden");
      EnrolledCourse.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "Vis");
      console.log("My Courses");
    }
  };

  return (
    <div className="ProfileContainer">
      <div className="SideMenu">
        <button onClick={() => SetVis("dash")}>Dashboard</button>
        <button onClick={() => SetVis("settings")}>Settings </button>
        <button onClick={() => SetVis("Enrolled-courses")}>
          Enrolled Courses
        </button>
        <button onClick={() => SetVis("MyCourses")}>My Courses</button>
      </div>
      <div className="ContentArea">
        <EnrolledCourses className="ProfileEnrolled" id="hidden" />
        <MyCreatedCourses className="ProfileMyCourses" id="hidden" />
        <UserInfo className="ProfileDash" id="" />
        <SettingsPage className="ProfileSettings" id="hidden" />
      </div>
    </div>
  );
}
