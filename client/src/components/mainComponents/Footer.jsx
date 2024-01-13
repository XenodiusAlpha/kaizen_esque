import React from 'react';
import image from '../../assets/img/LogoNew.png'
import { Link } from 'react-router-dom';


export default function Footer(){
    return (
      <div className='footer-Style flex-container-row keepBottom center-content'>

          <Link to="/">
            <img src={image} alt="" />
          </Link>

          <div className='flex-container-columns center-content'>
          <p className='header-Text dpl'>Copyright Kaizen-Esque 2024©</p>

          <Link to="/LearnMore">
          <h4 className='learnMore_Link dpl'>Learn More</h4>
          </Link>

          </div>
      </div>
    );
  }
