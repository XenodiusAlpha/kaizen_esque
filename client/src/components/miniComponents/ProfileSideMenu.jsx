import { Button } from "bootstrap";
import "../../assets/css/ProfileSideMenu.css";
import { useState } from "react";

export default function SideMenu(props) {
  return (
    <div className="SideMenu">
      <button>Dashboard</button>
      <button>Settings</button>
      <button>Enrolled Courses</button>
      <button>Close menu</button>
    </div>
  );
}
