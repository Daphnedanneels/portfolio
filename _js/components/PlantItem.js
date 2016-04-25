'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';

export default class PlantItem extends Component{

  constructor(props, context){
    super(props, context);
  }

  onClickHandler(){
    this.props.getPlant(this.props);
  }

  render(){
    let {foto, id, plant_naam} = this.props;

    return (
      <li className="groente">
        <label for={plant_naam} onClick={()=>this.onClickHandler()}>
          <input type="radio" name="groente" ref="plantItem" id={plant_naam} value={id}/>
          <img width="100" height="100" src={`${basename}/assets/icons/groentenalone/${foto}`} alt={`${plant_naam}`}/>
          <span className="labelnaam">{plant_naam}</span>
        </label>
       </li>
    );
  }
}
