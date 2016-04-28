'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import {isEmpty} from 'lodash';
import token from '../auth/token';

export default class MedeEigenaars extends Component{

  constructor(props, context){
    super(props, context);
    this.state ={
      adminMoestuin: '',
      adminMoestuinSet: false,
      user: ''
    };
  }

  componentDidMount(){

    if (!isEmpty(this.props.moestuin) && this.props.id === this.props.moestuin.eigenaar){
      this.setState({adminMoestuin: this.props.id});
      this.setState({adminMoestuinSet: true});
    }

    if (this.props.id === token.content().user.id){
      this.setState({user: this.props.id});
    }

  }

  clickHandler(e){
    e.preventDefault();
    this.props.removeMedeEigenaar(this.props.id);
  }

  renderRemoveButton(){
    if (!this.state.adminMoestuinSet && this.props.id !== token.content().user.id){
      return <a className="removeuser" href="#" onClick={(e)=> this.clickHandler(e)}><span>-</span></a>;
    }
  }

  renderStatus(){
    if(!isEmpty(this.props.moestuin) && this.props.id === this.props.moestuin.eigenaar){
      return <p className="adminIcon"></p>;
    }
  }

  render(){

    let {voornaam, achternaam, foto} = this.props;
    let {adminMoestuin, adminMoestuinSet, user} = this.state;
    let name = '';

    if (adminMoestuinSet){
      if (adminMoestuin){
        name = 'admin order';
      }else{
        name = '';
      }
    }

    if (user){
      name ='user order2';
    }

    return (
      <li className={`mijnmoestuineigenaarsItem ${name}`}>
        {this.renderStatus()}
        {this.renderRemoveButton()}
        <figure>
          <img src={`${basename}/assets/img/${foto}`} width="100" height="100" alt={`${voornaam} ${achternaam}`}/>
          <figcaption>{voornaam}</figcaption>
        </figure>
      </li>
    );
  }
}
