'use strict';

import React from 'react';
import {basename} from '../../globals';

const Degrees = ({animate}) => {
  let state = 'start';
  if(animate){
    state = 'end';
  }
  return (
    <div className='content-wrap'>
      <div className={`degree ${state}`}>
        <img src={`${basename}/assets/img/artevelde.png`} alt="Artevelde"/>
        <h2>Cross Media Design</h2>
        <p>Artevelde Hogeschool Gent</p>
      </div>
      <div className={`degree ${state}`}>
        <img src={`${basename}/assets/img/devine.png`} alt="Devine"/>
        <h2>Digital design and development</h2>
        <p>Howest Kortrijk</p>
      </div>
    </div>
  );
};

export default Degrees;
