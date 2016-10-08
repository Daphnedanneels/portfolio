'use strict';

import React from 'react';
import {basename} from '../../globals';

const Info = ({animate}) => {
  let state = 'start';
  if(animate){
    state = 'end';
  }
  return (
    <div className='content-wrap'>
      <p className={`width-constraint ${state}`}>My name is Daphné, a Belgium based graphic designer and developer. My logo is a chameleon because I can transform into anyone you require at the time, from either a graphic designer to an illustrator, motion designer, print expert, frond-ender, back-ender, you name it! I have a wide range of skills and am above all very enthousiastic and eager to learn.</p>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/gsm.png`} alt=""/><p>Daphneologic@hotmail.com</p></div>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/email.png`} alt=""/><p>+32 477 03 40 17</p></div>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/home.png`} alt=""/><p>Ghent, Belgium</p></div>
    </div>
  );
};

export default Info;
