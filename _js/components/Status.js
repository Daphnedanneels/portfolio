'use strict';

import React, {Component} from 'react';

export default class Status extends Component{

  constructor(props, context){
    super(props, context);
  }

  render(){
    let data;

    if (this.props.type === 'oogst'){
      data = {
        icon: 'oogsticon',
        kleur: 'statusgroen',
        lichtkleur: 'lichtgroen',
        tekst: 'oogsten binnen: ',
        addClass: ''
      };
    }

    if (this.props.type === 'oogsttijd'){
      data = {
        icon: 'oogsticon',
        kleur: 'statusgroen',
        lichtkleur: 'statusgroen',
        tekst: 'tijd om te oogsten!',
        addClass: 'hide'
      };
    }

    if (this.props.type === 'water'){
      data = {
        icon: 'watericon',
        kleur: 'statusblauw',
        lichtkleur: 'lichtblauw',
        tekst: 'water geven binnen ',
        addClass: ''
      };
    }

    if (this.props.type === 'water nodig'){
      data = {
        icon: 'watericon',
        kleur: 'oranje',
        lichtkleur: 'oranje',
        tekst: 'Je plant heeft dringend water nodig!',
        addClass: 'hide'
      };
    }

    if (this.props.type === 'water op'){
      data = {
        icon: 'watericon',
        kleur: 'rood',
        lichtkleur: 'rood',
        tekst: 'je plant is kapot',
        addClass: 'hide'
      };
    }

    return (
      <div>
        <div className={`icon ${data.icon}`}>
          <p>{data.tekst} <span className={`watertijd ${data.addClass}`} >{this.props.statusTijd}</span></p>
        </div>
        <div className="status">
          <div className={`oogstnu ${data.kleur}`}></div>
          <div className={`oogsttotaal ${data.lichtkleur}`}></div>
        </div>
      </div>
    );
  }
}
