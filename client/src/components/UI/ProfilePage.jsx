import React, { useState } from "react";
import { Link } from "react-router-dom";
// This will be used later.
import SideMenu from "../miniComponents/ProfileSideMenu";
import "../../assets/css/profile.css";

export default function ProfilePage() {
  const [className, SetClassName] = useState("SideMenuContainer");

  function setVis() {
    if (className === "SideMenuContainer") {
      SetClassName("SideMenuContainer hidden");

      console.log("SideMenuContainer hidden");
    } else if (className === "SideMenuContainer hidden") {
      SetClassName("SideMenuContainer");
      console.log("SideMenuContainer");
    }
  }

  return (
    <div className="ProfileContainer">
      <SideMenu className={className} />
      <div>
        <button onClick={setVis}>SideMenu</button>
      </div>
    </div>
  );
}
