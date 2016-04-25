'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {basename} from '../globals';

export default class Moestuinitem extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){

    let {moestuinen_id, naam, foto} = this.props;

    return (
      <li className="moestuinitem">
        <Link to={`detail/${moestuinen_id}`} className="moestuinhover">
          <div className="blackoverlay">
            <button className="detailbutton" type=""></button>
          </div>
          <img width="250" height="150" src={`${basename}/assets/img/${foto}`} alt={`${naam}`}/>
          <p className="moestuintitel">{naam}</p>
        </Link>
      </li>
    );
  }
}
