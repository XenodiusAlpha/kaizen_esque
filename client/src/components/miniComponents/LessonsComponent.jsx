//Need import of assets from back-end to construct front end here. Create function to pull Json

import React, { useState } from 'react';
import thumbnail from '../../assets/img/PlaceholderImage.png'
import { Link } from 'react-router-dom';

export default function LessonsComponent(props) {
    return (
    <>
    <div className='lcbox-style flex-container-columns'>
    <div>
    <h2 className='lessonTitle'>{props.title}</h2>
    <img className='lessonthumbnail' src={thumbnail} alt="lessonthumbnail" />
    </div>
    <p>{props.description}</p>
    <p>{props.author}</p>
    <p>{props.hyperlink}</p>
    <Link className='lessonButton' to="/">
          <p>Start Lesson</p>
          </Link>
    </div>
    </>
    )
};