import React from 'react';
import image from '../../assets/img/PlaceholderImage.png'
import { Link } from 'react-router-dom';


export default function Footer(){
    return (
      <div className='visualize-Test-Area flex-container-row keepBottom center-content'>

<a href="https://www.placeholder.nothing" target="_blank">
        <img className='' src={image} alt="link to nothing" />
        </a>
          <div className='flex-container-columns'>
          <p className='header-Text dpl'>Copyright Kaizen-Esque 2024©</p>
          <Link to="/LearnMore">
          <h2 className='dpl'>Learn More</h2>
          </Link>
          </div>
      </div>
    );
  }
