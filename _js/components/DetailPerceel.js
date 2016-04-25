'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';
// import {PlantItem} from './index';
// import {isEmpty} from 'lodash';

export default class DetailPerceel extends Component{

  constructor(props, context){
    super(props, context);
  }

  waterHandler(e){
    e.preventDefault();
    console.log("geef wata");
  }

  oogstHandler(e){
    e.preventDefault();
    console.log("oogsta");
  }

  verwijderHandler(e){
    e.preventDefault();
    this.props.deletePlant(this.props.selectedPlant);
  }

  render(){

    // console.log(this.props.selectedPlant);

    let {foto, plant_naam,percelen_id} = this.props.selectedPlant;

    return (
      <div className="oogsttijdwrapper">
        <div className="oogsttijd">
          <Link className="closeIcon" to="" onClick={(e, item = 'oogsttijdwrapper')=>this.props.closeItem(e, item)}>+</Link>
          <div className="oogstijdtitlewrapper">
            <img width="200" height="200" src={`${basename}/assets/icons/groentenalone/${foto}`} alt={plant_naam}/>
            <p class="firstUpper">{plant_naam}</p>
          </div>
          <div className="oogsttijddata">
            <h3>Eigenschappen</h3>
            <div className="watericon">
              <p>Water geven binnen <span className="watertijd">3 uur </span></p>
            </div>
            <div className="status">
              <div className="waternu"></div>
              <div className="watertotaal"></div>
            </div>
            <div className="oogsticon">
              <p>Oogsten binnen <span className="watertijd">3 uur </span></p>
            </div>
            <div className="status">
              <div className="oogstnu"></div>
              <div className="oogsttotaal"></div>
            </div>
          </div>
          <div className="plantbuttons">
            <Link className="button waterbutton" to="" onClick={(e)=>this.waterHandler(e)}>Water</Link>
            <Link className="button oogstbutton" to="" onClick={(e)=>this.oogstHandler(e)}>Oogsten</Link>
            <Link className="button verwijderbutton" to="" onClick={(e)=>this.verwijderHandler(e)}>Verwijder</Link>
          </div>
       </div>
      </div>
    );
  }
}
