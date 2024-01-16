import React from "react";
import { Link } from "react-router-dom";

const LogoutComponent = ({ loggedin, currentPage, handleLinkClick }) => {
    
  return (
    <div className="nav-Button dpl">
      <Link
        to={loggedin ? "/Login" : "/"}
        className={currentPage === (loggedin ? "/Login" : "/Logout") ? "nav-active" : "nav-link"}
        onClick={handleLinkClick}
      >
        <p>{loggedin ? "Login" : "Logout"}</p>
      </Link>
    </div>
  );
};

export default LogoutComponent;
