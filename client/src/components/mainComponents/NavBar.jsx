import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const currentPage = useLocation().pathname;

  const handleLinkClick = (event) => {
    document.querySelectorAll("nav").forEach((link) => {
      link.className.remove("nav-active");
    });
    event.target.className.add("nav-active");
  };
<<<<<<< HEAD
  // Divider
  return (
    <div className="flex-container-row nav-fill">
      <div className="nav-style">
        <FontAwesomeIcon icon={faBars} />
      </div>
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

        <div className="nav-Button dpl">
          <Link
            to="/Profile"
            className={currentPage === "/Profile" ? "nav-active" : "nav-link"}
            onClick={handleLinkClick}
          >
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
=======
// Divider
    return (
      <div className='flex-container-row '>
        <div className='Profile-Icon'>
        <Link
          to="/"
          className='wt'
          onClick={handleLinkClick}
        >
        <FontAwesomeIcon icon={faBars} />
        </Link>
          
        </div>
        <nav className='nav-style flex-container-row'>
          <div className='nav-Button'>
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          <p>Home</p>
        </Link>

        </div>
        <div className='nav-Button dpl'>
        <Link
          to="/Courses"
          className={currentPage === '/Courses' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          <p>Courses</p>
        </Link>
        </div>


        <div className='nav-Button dpl'>
        <Link
          to="/Login"
          className={currentPage === '/Login' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          <p>Login</p>
        </Link>
        </div>




        </nav>
        <div className='Profile-Icon'>
        <Link
          to="/Profile"
          className='wt'
          onClick={handleLinkClick}
        >
        <FontAwesomeIcon icon={faCircleUser} />
        </Link>
        </div>
      </div>
    );
  }

  //Note that Profile-Icon will use hidden-element and only be accessable if the
  //user is logged in
>>>>>>> 55855a22c2d586fc80c17798c95d8575053008c6
