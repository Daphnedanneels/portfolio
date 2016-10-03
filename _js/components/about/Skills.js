'use strict';

import React from 'react';

const Skills = ({animate}) => {
  console.log(animate);
  let state = 'start';
  if(animate){
    state = 'end';
  }

  return (
    <div className='content-wrap'>
      <div className="grafiek">
        <div className={`photo-editing ${state}`}><span>photo editing</span></div>
        <div className={`illustration ${state}`}><span>illustration</span></div>
        <div className={`web-design ${state}`}><span>web design</span></div>
        <div className={`photography ${state}`}><span>photography</span></div>
        <div className={`typography ${state}`}><span>typography</span></div>
        <div className={`layout ${state}`}><span>layout</span></div>
        <div className={`motion ${state}`}><span>motion</span></div>
      </div>
    </div>
  );
};

export default Skills;
