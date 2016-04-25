'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';

export default class AardeRegister extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <li className="plot">
        <img width="164" height="164" src={`${basename}/assets/icons/aarde.svg`} alt="aarde" />
      </li>
    );
  }
}

