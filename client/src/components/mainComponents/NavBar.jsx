import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function NavBar(){
    const currentPage = useLocation().pathname;

  const handleLinkClick = (event) => {
    document.querySelectorAll('nav').forEach(link => {
      link.className.remove('nav-active');
    });
    event.target.className.add('nav-active');
  };
// Divider
    return (
      <div className='flex-container-row nav-fill'>
        <div className='nav-style'>
          <FontAwesomeIcon icon={faBars} />
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

        <div className='nav-Button dpl'>
        <Link
          to="/Profile"
          className={currentPage === '/Profile' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
        <FontAwesomeIcon icon={faCircleUser} />
        </Link>
        </div>


        </nav>
      </div>
    );
  }