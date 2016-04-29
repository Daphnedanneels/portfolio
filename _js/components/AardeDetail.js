'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';


export default class AardeDetail extends Component{

  constructor(props, context){
    super(props, context);
  }

  onClickHandler(e, props){
    e.preventDefault();
    let {status} = props;



    if (parseInt(status) ===0){
      this.props.showInsert(props);
    }
    if (parseInt(status)===1){
      this.props.showStatus(props);
    }
  }

  renderPicture(foto){
    let fotoLink = '';
    if (foto === null){
      fotoLink = `${basename}/assets/icons/aarde.svg`;
    }else{
      fotoLink = `${basename}/assets/icons/groentenaarde/${foto}`;
    }
    return fotoLink;
  }

  renderAddClass(status){
    let classAdd = '';

    if(parseInt(status) === 1){
      classAdd='hide';
    }
    return classAdd;
  }

  render(){

    let {status, foto} = this.props;

    return (

      <li className="perceel">
         <Link className="plot" to="" onClick={(e, props = this.props)=>this.onClickHandler(e, props)}>
           <img width="164" height="164" src={this.renderPicture(foto)} alt="perceel"/>
           <p className={`perceelhover ${this.renderAddClass(status)}`}>+</p>
         </Link>
         <div className={`water ${this.renderAddClass(status+1)}`}>
        </div>
       </li>


    );
  }
}
