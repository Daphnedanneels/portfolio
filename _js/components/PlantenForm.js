'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {PlantItem} from './index';

import {isEmpty} from 'lodash';

export default class PlantenForm extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      selectedPlant: '',
      error: ''
    };
  }

  getPlant(plant){
    this.setState({selectedPlant: plant});
  }

  validatePlant(){

    let error;

    let {selectedPlant} = this.state;

    if (!selectedPlant){
      error = 'Je bent een plant vergeten selecteren!';
    }

    return error;

  }

  insertPlant(e){
    e.preventDefault();

    let error = this.validatePlant();

    if (isEmpty(error)){
      let {selectedPerceel} = this.props;
      let {id} = this.state.selectedPlant;

      let data = {
        'perceel_id': selectedPerceel.percelen_id,
        'plant_id': id,
        'action':'insert'
      };
      this.props.updatePerceel(data);

    }else{
      this.setState({error});
    }
  }

  renderPlanten(){
    let {planten, plantenFetched} = this.props;

    if(plantenFetched){
      return planten.map(plantje => <PlantItem getPlant={(plant)=>this.getPlant(plant)} key={plantje.id} {...plantje} />);
    }
  }

  render(){
    let {error} = this.state;


    return (
      <div className="dropdownformwrapper">
        <form className="dropdownform" action="#" method="POST" onSubmit={(e)=>this.insertPlant(e)}>
           <div className="dropdown">
              <div className="dropdowntop">
                <p>Plant een groente.</p>
                <Link className="closeIcon" onClick={(e, item = 'dropdownformwrapper')=>this.props.closeItem(e, item)}to="#">+</Link>
              </div>
              <ul className="groentenlijst">
              <li className="errorItem"><p className="error">{error}</p></li>
              {this.renderPlanten()}
             </ul>
             <div className="buttonwrapper">
               <input className="button" type="submit" name="submit" defaultValue="Planten"/>
             </div>
           </div>
         </form>
      </div>
    );
  }
}
