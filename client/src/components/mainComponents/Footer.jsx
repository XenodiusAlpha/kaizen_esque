import React from 'react';
import image from '../../assets/img/PlaceholderImage.png'
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
          <h4 className='dpl'>Learn More</h4>
          </Link>

          </div>
      </div>
    );
  }
