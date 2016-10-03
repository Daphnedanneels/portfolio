'use strict';

import React from 'react';
import {basename} from '../../globals';

const Code = ({animate}) => {
  let state = 'start';
  if(animate){
    state = 'end';
  }
  return (
    <div className='content-wrap'>
      <div className={`software-list ${state}`}>
        <img src={`${basename}/assets/img/development/html.png`} alt="HTML"/>
        <img src={`${basename}/assets/img/development/css.png`} alt="CSS"/>
        <img src={`${basename}/assets/img/development/js.png`} alt="JS"/>
        <img src={`${basename}/assets/img/development/swift.png`} alt="Swift"/>
        <img src={`${basename}/assets/img/development/php.png`} alt="PHP"/>
        <img src={`${basename}/assets/img/development/mysql.png`} alt="MySQL"/>
        <img src={`${basename}/assets/img/development/sass.png`} alt="Sass"/>
        <img src={`${basename}/assets/img/development/github.png`} alt="GitHub"/>
        <img src={`${basename}/assets/img/development/npm.png`} alt="NPM"/>
        <img src={`${basename}/assets/img/development/webpack.png`} alt="Webpack"/>
        <img src={`${basename}/assets/img/development/react.png`} alt="React"/>
        <img src={`${basename}/assets/img/development/phaser.png`} alt="Phaser"/>
      </div>
    </div>
  );
};

export default Code;
