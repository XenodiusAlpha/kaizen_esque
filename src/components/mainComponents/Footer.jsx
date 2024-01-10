import React from 'react';
import image from '../../assets/img/PlaceholderImage.png'

export default function Footer(){
    return (
      <div className='visualize-Test-Area flex-container-row keepBottom center-content'>

<a href="https://www.placeholder.nothing" target="_blank">
        <img className='' src={image} alt="link to nothing" />
        </a>
          <div className='flex-container-columns'>
          <p className='header-Text dpl'>Copyright Kaizen-Esque 2024©</p>
          <a href="https://www.placeholder.nothing" target="/LearnMore">
            <h2 className='dpl'>Learn More</h2>
          </a>
          </div>
      </div>
    );
  }


  const learnMore = function NavBar(){
    const currentPage = useLocation().pathname;

  const handleLinkClick = (event) => {
    document.querySelectorAll('nav').forEach(link => {
      link.className.remove('nav-active');
    });
    event.target.className.add('nav-active');
  };
// Divider
    return (
      <div className='flex-container-columns visualize-Test-Area'>
        <nav className='flex-container-row'>


          <div className='nav-Button buttonRed'>
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          Home
        </Link>

        </div>

        <div className='nav-Button buttonRed'>
        <Link
          to="/Courses"
          className={currentPage === '/Courses' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          Courses
        </Link>
        </div>


        <div className='nav-Button buttonGreen'>
        <Link
          to="/Login"
          className={currentPage === '/Login' ? 'nav-active' : 'nav-link'}
          onClick={handleLinkClick}
        >
          Login
        </Link>
        </div>


        </nav>
      </div>
    );
  }