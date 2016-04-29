'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';

export default class UserItem extends Component{

  constructor(props, context){
    super(props, context);
  }

  onClickHandler(props){


    if (this.props.insertOnClick){
      this.props.pushEigenaarIntoUsers(props);
    }else{
      this.props.pushEigenaar(props);
    }
  }

  render(){

    let {voornaam, achternaam, foto, id} = this.props;

    return (
      <li className="userinlijst">
        <input type="radio" name="user"
        id="1"
        ref="medeeigenaar" value={id}
        />
        <label for={id} onClick={()=>this.onClickHandler(this.props)}>
          <img width="50" height="50" src={`${basename}/${foto}`} alt={`${voornaam} ${achternaam}`}/>
          <span className="labelnaam">{`${voornaam} ${achternaam}`}</span>
        </label>
      </li>
    );
  }
}
