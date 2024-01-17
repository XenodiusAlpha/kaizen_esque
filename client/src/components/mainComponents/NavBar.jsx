import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const currentPage = useLocation().pathname;

  const [loggedIn, SetisLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
  );

  const Profile = (e) => {
    if (loggedIn === null) {
      return (
        <Link to={"/Login"} className="wt PROFILEICON">
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
      );
    } else if (loggedIn === "true") {
      return (
        <Link to={"/Profile"} className="wt PROFILEICON">
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
      );
    }
  };

  const handleLinkClick = (event) => {
    document.querySelectorAll("nav").forEach((link) => {
      link.className.remove("nav-active");
    });
    event.target.className.add("nav-active");
  };

  // Divider
  return (
    <div className="flex-container-row ">
      {/* <div className="Profile-Icon">
        <Link to="/" className="wt" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faBars} />
        </Link>
      </div> */}
      <nav className="nav-style flex-container-row">
        <div className="nav-Button">
          <Link
            to="/"
            className={currentPage === "/" ? "nav-active" : "nav-link"}
            onClick={handleLinkClick}
          >
            <p>Home</p>
          </Link>
        </div>
        <div className="nav-Button dpl">
          <Link
            to="/Courses"
            className={currentPage === "/Courses" ? "nav-active" : "nav-link"}
            onClick={handleLinkClick}
          >
            <p>Courses</p>
          </Link>
        </div>

        <div className="nav-Button dpl">
          <Link
            to="/Login"
            className={currentPage === "/Login" ? "nav-active" : "nav-link"}
            onClick={handleLinkClick}
          >
            <p>Login</p>
          </Link>
        </div>
      </nav>
      <div className="Profile-Icon dpl ">
        <div className="dpr fa-2x">
          <Profile />
        </div>
      </div>
    </div>
  );
}

//Note that Profile-Icon will use hidden-element and only be accessable if the
//user is logged in
