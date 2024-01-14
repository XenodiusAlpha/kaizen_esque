import "../../assets/css/ProfileSideMenu.css";
import { useState } from "react";

export default function SideMenu(props) {
  return (
    <div className={props.className}>
      <a>Settings</a>
      <a>Enrolled Courses</a>
    </div>
  );
}
