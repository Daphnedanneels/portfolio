'use strict';

import React from 'react';
import {basename} from '../../globals';

const Me = ({animate}) => {
  let state = 'start';
  if(animate){
    state = 'end';
  }
  return (
    <div className='content-wrap'>
      <div className={`traits ${state}`}>
        <div className="column">
          <h2>I AM</h2>
          <ul>
            <li><img src={`${basename}/assets/img/icons/ambition.png`} alt=""/><p>Ambitious</p></li>
            <li><img src={`${basename}/assets/img/icons/creative.png`} alt=""/><p>Creative</p></li>
            <li><img src={`${basename}/assets/img/icons/curious.png`} alt=""/><p>Curious</p></li>
            <li><img src={`${basename}/assets/img/icons/source.png`} alt=""/><p>Resourceful</p></li>
            <li><img src={`${basename}/assets/img/icons/perfect.png`} alt=""/><p>Perfectionist</p></li>
          </ul>
        </div>
        <div className="column">
          <h2>I LOVE</h2>
          <ul>
            <li><img src={`${basename}/assets/img/icons/animal.png`} alt=""/><p>Animals</p></li>
            <li><img src={`${basename}/assets/img/icons/book.png`} alt=""/><p>Books</p></li>
            <li><img src={`${basename}/assets/img/icons/travel.png`} alt=""/><p>Travelling</p></li>
            <li><img src={`${basename}/assets/img/icons/fashion.png`} alt=""/><p>Fashion</p></li>
            <li><img src={`${basename}/assets/img/icons/sushi.png`} alt=""/><p>Sushi</p></li>
          </ul>
        </div>
        <div className="column">
          <h2>I DO</h2>
          <ul>
            <li><img src={`${basename}/assets/img/icons/cook.png`} alt=""/><p>Cooking</p></li>
            <li><img src={`${basename}/assets/img/icons/photo.png`} alt=""/><p>Photography</p></li>
            <li><img src={`${basename}/assets/img/icons/write.png`} alt=""/><p>Writing</p></li>
            <li><img src={`${basename}/assets/img/icons/sing.png`} alt=""/><p>Singing</p></li>
            <li><img src={`${basename}/assets/img/icons/game.png`} alt=""/><p>Gaming</p></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Me;
