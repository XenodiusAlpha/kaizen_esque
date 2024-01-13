import React from 'react';
import image from '../../assets/img/LogoNew.png'

export default function Header(){
    return (
      <>
        <div className='header-Style flex-container-row'>
        <img className='header-Logo' src={image} alt="link to nothing" />
          <div className='flex-container-columns'>
          <h2 className='title-style color-green'>Kaizen <br /> Esque <br /> </h2>
          <p className='title-style dpl color-green'>Learn Something New!</p>
          </div>
        </div>
      </>
    );
  }