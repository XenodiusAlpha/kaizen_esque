import React, { useState, useEffect } from "react";
import EnrolledCourses from "../miniComponents/EnrolledCourses";
import UserInfo from "../miniComponents/UserInfo";
import MyCourses from "../miniComponents/MyCreatedCourses.jsx";
import CreateCourse from "../miniComponents/createCourse.jsx";

import "../../assets/css/profile.css";
import "../../assets/css/hidden.css";
import UserSettings from "../miniComponents/UserSettings.jsx";

export default function InstructorDashboard() {
  //This function is just for setting the visibility of each area of the dashboard -JKD

  const SetVis = (name) => {
    const Dashboard = document.querySelector(".ProfileDash");
    const Settings = document.querySelector(".ProfileSettings");
    const Courses = document.querySelector(".EnrolledCourses");
    const MyCourses = document.querySelector(".MyCourses");
    const createCourse = document.querySelector(".createCourse");

    if (name === "dash") {

      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
      createCourse.setAttribute("id", "hidden");
    } else if (name === "settings") {
      Settings.setAttribute("id", "");
      Courses.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
      createCourse.setAttribute("id", "hidden");
    } else if (name === "courses") {
      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "Vis");
      createCourse.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
    } else if (name === "Mycourses") {
      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "Vis");
      createCourse.setAttribute("id", "hidden");
    } else if (name === "createCourse") {
      Settings.setAttribute("id", "hidden");
      Courses.setAttribute("id", "hidden");
      MyCourses.setAttribute("id", "hidden");
      createCourse.setAttribute("id", "vis");
    }
  };

  return (
    <div className="ProfileContainer">
      <div className="SideMenu">
        <UserInfo className="ProfileDash" id="" />
        <button onClick={() => SetVis("settings")}>Settings </button>
        <button onClick={() => SetVis("courses")}>Enrolled Courses</button>
        <button onClick={() => SetVis("Mycourses")}>My Courses</button>
        <button onClick={() => SetVis("createCourse")}>Create Course</button>
      </div>
      <div className="ContentArea">
        <EnrolledCourses className="ProfileEnrolled" id="hidden" />
        <UserSettings className="ProfileSettings" id="hidden" />
        <MyCourses className="MyCourses" id="hidden" />
        <CreateCourse className="createCourse" id="hidden" />
      </div>
    </div>
  );
}
