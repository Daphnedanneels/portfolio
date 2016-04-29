'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';
import moment from 'moment';
import {Status} from '../components/index';

import {isEmpty} from 'lodash';

export default class DetailPerceel extends Component{

  constructor(props, context){
    super(props, context);
  }

  componentDidMount(){
  }

  waterHandler(e){
    e.preventDefault();
    if (e.currentTarget.dataset.click ==='true'){
      this.props.waterPlant(this.props.selectedPlant);
    }
  }

  oogstHandler(e){
    e.preventDefault();
    if (e.currentTarget.dataset.click ==='true'){
      this.props.deletePlant(this.props.selectedPlant);
    }
  }

  verwijderHandler(e){
    e.preventDefault();
    this.props.deletePlant(this.props.selectedPlant);
  }

  renderGrowTime(props){
    if (!isEmpty(props.selectedPlant)){
      let oogstbutton = document.querySelector('.oogstbutton');
      let huidigeTijd = moment();
      let totaalTijd = moment(props.selectedPlant.created).add(props.selectedPlant.tijd_tot_oogst, 'days');
      let statusTijd = moment(props.selectedPlant.created).add(props.selectedPlant.tijd_tot_oogst, 'days').fromNow(true);
      let verschilTijd = totaalTijd.diff(huidigeTijd, 'seconds');

      if (verschilTijd < 0){
        oogstbutton.setAttribute('data-click', true);
        oogstbutton.style.opacity = '1';
        return <Status statusTijd={statusTijd} type="oogsttijd" />;
      }
      oogstbutton.setAttribute('data-click', false);
      oogstbutton.style.opacity = '0.2';
      return <Status statusTijd={statusTijd} type="oogst"/>;
    }
  }

  renderWaterTime(props){

    if (!isEmpty(props.selectedPlant)){

      let waterbutton = document.querySelector('.waterbutton');
      let oogstbutton = document.querySelector('.oogstbutton');

      let huidigeTijd = moment();
      let totaalTijd = moment(props.selectedPlant.watered).add(props.selectedPlant.tijd_tot_water, 'hours');
      let statusTijd = moment(props.selectedPlant.watered).add(props.selectedPlant.tijd_tot_water, 'hours').fromNow(true);
      let verschilTijd = totaalTijd.diff(huidigeTijd, 'seconds');

      if (verschilTijd < -3600){
        waterbutton.style.opacity = '0.2';
        oogstbutton.style.opacity = '0.2';

        waterbutton.setAttribute('data-click', false);
        oogstbutton.setAttribute('data-click', false);

        return <Status statusTijd={statusTijd} type='water op' />;
      }

      waterbutton.style.opacity = '1';
      oogstbutton.style.opacity = '1';


      if (verschilTijd <0){
        return <Status statusTijd={statusTijd} type='water nodig' />;
      }

      waterbutton.setAttribute('data-click', true);
      oogstbutton.setAttribute('data-click', true);

      return <Status statusTijd={statusTijd} type='water'/>;
    }
  }

  render(){

    let {foto, plant_naam} = this.props.selectedPlant;
    moment.locale('nl');

    return (

      <div className="oogsttijdwrapper">
        <div className="oogsttijd">
          {/*<Link className="closeIcon" to="" onClick={(e, item = 'oogsttijdwrapper')=>this.props.closeItem(e, item)}>+</Link>*/}
          <Link className="closeIcon" to="" onClick={(e)=> this.props.closeItem(e, 'oogsttijdwrapper')}>+</Link>
          <div className="oogstijdtitlewrapper">
            <img width="200" height="200" src={`${basename}/assets/icons/groentenalone/${foto}`} alt={plant_naam}/>
            <p class="firstUpper">{plant_naam}</p>
          </div>

          <div className="oogsttijddata">
            <h3>Eigenschappen</h3>
            {this.renderWaterTime(this.props)}
            {this.renderGrowTime(this.props)}
          </div>
          <div className="plantbuttons">
            <Link className="button waterbutton" ref="waterbutton" to="" onClick={(e)=>this.waterHandler(e)}>Water</Link>
            <Link className="button oogstbutton" ref= "oogstbutton" to="" onClick={(e)=>this.oogstHandler(e)}>Oogsten</Link>
            <Link className="button verwijderbutton" to="" onClick={(e)=>this.verwijderHandler(e)}>Verwijder</Link>
          </div>
       </div>
      </div>
    );
  }
}
