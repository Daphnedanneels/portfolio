'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';

export default class ComponentName extends Component{

  constructor(props, context){
    super(props, context);
  }


  clickHandler(e){
    e.preventDefault();
    this.props.removeMedeEigenaar(this.props.id);
  }

  render(){

    // console.log(this.props);
    let {voornaam, achternaam, foto} = this.props;

    return (
      <li className="mijnmoestuineigenaarsItem noAdmin">
        <a className="removeuser" href="#" onClick={(e)=> this.clickHandler(e)}><span>-</span></a>
        <figure>
          <img src={`${basename}/assets/img/${foto}`} width="100" height="100" alt={`${voornaam} ${achternaam}`}/>
          <figcaption>{voornaam}</figcaption>
        </figure>
      </li>
    );
  }
}
