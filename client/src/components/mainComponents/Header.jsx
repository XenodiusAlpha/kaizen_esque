<<<<<<< HEAD
import React from "react";
import image from "../../assets/img/PlaceholderImage.png";

export default function Header() {
  return (
    <>
      <div className="header-Style flex-container-row">
        <img className="header-Logo" src={image} alt="link to nothing" />
        <div className="flex-container-columns">
          <h2 className="title-style">
            Kaizen <br /> Esque <br />{" "}
          </h2>
          <p className="title-style dpl">Learn Something New!</p>
=======
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
>>>>>>> 55855a22c2d586fc80c17798c95d8575053008c6
        </div>
      </div>
    </>
  );
}
