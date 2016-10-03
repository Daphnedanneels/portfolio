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
      <p className={`width-constraint ${state}`}>Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/gsm.png`} alt=""/><p>Daphneologic@hotmail.com</p></div>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/email.png`} alt=""/><p>+32 477 03 40 17</p></div>
      <div className={`info-line ${state}`}><img src={`${basename}/assets/img/icons/home.png`} alt=""/><p>Ghent, Belgium</p></div>
    </div>
  );
};

export default Info;
