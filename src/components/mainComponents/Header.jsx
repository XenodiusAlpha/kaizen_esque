import React from 'react';
import image from '../../assets/img/PlaceholderImage.png'

export default function Header(){
    return (
      <>
        <div className='visualize-Test-Area flex-container-row'>
        <img className='header-Logo' src={image} alt="link to nothing" />
          <div className='flex-container-columns'>
          <h2 className='title-style'>Kaizen <br /> Esque <br /> </h2>
          <p className='dpl'>Learn Something New!</p>
          </div>
        </div>
      </>
    );
  }