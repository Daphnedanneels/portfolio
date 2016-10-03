'use strict';

import React from 'react';
import {basename} from '../../globals';

const Experience = ({animate}) => {
  let state = 'start';
  if(animate){
    state = 'end';
  }
  return (
    <div className='content-wrap'>
      <div className={`work ${state}`}>
        <a href="http://www.positief-negatief.be/" target="_blank"><img src={`${basename}/assets/img/positiefnegatief.png`} alt="Positief-Negatief"/></a>
        <h2>Positief - Negatief</h2>
        <p>Graphic Design</p>
        <p>2014</p>
      </div>
      <div className={`work ${state}`}>
        <a href="https://www.esign.eu/en" target="_blank"><img src={`${basename}/assets/img/esign.png`} alt="Esign"/></a>
        <h2>Esign</h2>
        <p>Frond-end & Web Design</p>
        <p>2015</p>
      </div>
      <div className={`work ${state}`}>
        <a href="http://www.vrt.be/" target="_blank"><img src={`${basename}/assets/img/vrt.png`} alt="VRT"/></a>
        <h2>VRT - Generation What?</h2>
        <p>Graphic Design & Development</p>
        <p>2016</p>
      </div>
    </div>
  );
};

export default Experience;
