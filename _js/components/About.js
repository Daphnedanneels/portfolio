'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';

import {Info, Skills, Experience, Degrees, Code, Me} from './about/';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class About extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      component: '',
      animate: false,
      animateLogo: 'animate'
    };
  }

  componentDidMount(){
    this.setState({trigger: true});
    setTimeout(() => {
      this.setState({animateLogo: ''});
    }, 1000);
  }

  backToMain(){
    this.setState({trigger: false});
    this.props.backButton();
  }

  callComponent(name){
    this.setState({component: ''});
    this.setState({animate: false});
    this.setState({component: name});
    setTimeout(() => {
      this.setState({animate: true});
    }, 10);
  }

  render(){
    let {trigger, component, animateLogo} = this.state;
    let content, sectionComponent, active;

    if(component !== ''){
      active = 'active';
    }else{
      active = 'false';
    }

    switch(component){
    case 'skills':
      sectionComponent = <Skills animate={this.state.animate}/>;

      break;
    case 'info':
      sectionComponent = <Info animate={this.state.animate}/>;
      break;
    case 'me':
      sectionComponent = <Me animate={this.state.animate}/>;
      break;
    case 'degrees':
      sectionComponent = <Degrees animate={this.state.animate}/>;
      break;
    case 'experience':
      sectionComponent = <Experience animate={this.state.animate}/>;
      break;
    case 'code':
      sectionComponent = <Code animate={this.state.animate}/>;
      break;
    default:
      sectionComponent = '';
    }


    if(trigger){
      content = (<div className={`fullscreen about ${active}`}>
          <div className={`corner-logo ${animateLogo}`} onClick={() => this.backToMain()}>
            <img src={`${basename}/assets/img/logo.png`} alt=""/>
            <button>BACK</button>
          </div>
          <div className={`round-container no-overflow ${active}`}>
            <img className="rounded" src={`${basename}/assets/img/daphne.jpg`} alt=""/>
            <div className="about-nav">
              <div className={`info ${(component === 'info') ? 'active' : ''}`} onClick={() => this.callComponent('info')}></div>
              <div className={`skills ${(component === 'skills') ? 'active' : ''}`} onClick={() => this.callComponent('skills')}></div>
              <div className={`me ${(component === 'me') ? 'active' : ''}`} onClick={() => this.callComponent('me')}></div>
              <div className={`code ${(component === 'code') ? 'active' : ''}`} onClick={() => this.callComponent('code')}></div>
              <div className={`degrees ${(component === 'degrees') ? 'active' : ''}`} onClick={() => this.callComponent('degrees')}></div>
              <div className={`experience ${(component === 'experience') ? 'active' : ''}`} onClick={() => this.callComponent('experience')}></div>
            </div>
            <div className={`about-container ${active}`}>
              {sectionComponent}
            </div>
          </div>
          <div className="about-nav-mobile">
            <div className={`info ${(component === 'info') ? 'active' : ''}`} onClick={() => this.callComponent('info')}></div>
            <div className={`skills ${(component === 'skills') ? 'active' : ''}`} onClick={() => this.callComponent('skills')}></div>
            <div className={`me ${(component === 'me') ? 'active' : ''}`} onClick={() => this.callComponent('me')}></div>
            <div className={`code ${(component === 'code') ? 'active' : ''}`} onClick={() => this.callComponent('code')}></div>
            <div className={`degrees ${(component === 'degrees') ? 'active' : ''}`} onClick={() => this.callComponent('degrees')}></div>
            <div className={`experience ${(component === 'experience') ? 'active' : ''}`} onClick={() => this.callComponent('experience')}></div>
          </div>
          <div className={`about-container-mobile ${active}`}>
            {sectionComponent}
          </div>
      </div>);
    }

    return (
        <ReactCSSTransitionGroup transitionName = "left"
               transitionEnter = {true} transitionEnterTimeout = {1000}
               transitionLeave = {true} transitionLeaveTimeout = {1000}>
          {content}
        </ReactCSSTransitionGroup>
    );
  }
}

/* <div className="about-nav mobile">
            <div className={`info ${(component === 'info') ? 'active' : ''}`} onClick={() => this.callComponent('info')}></div>
            <div className={`skills ${(component === 'skills') ? 'active' : ''}`} onClick={() => this.callComponent('skills')}></div>
            <div className={`me ${(component === 'me') ? 'active' : ''}`} onClick={() => this.callComponent('me')}></div>
            <div className={`code ${(component === 'code') ? 'active' : ''}`} onClick={() => this.callComponent('code')}></div>
            <div className={`degrees ${(component === 'degrees') ? 'active' : ''}`} onClick={() => this.callComponent('degrees')}></div>
            <div className={`experience ${(component === 'experience') ? 'active' : ''}`} onClick={() => this.callComponent('experience')}></div>
          </div>
          <div className={`about-container mobile ${active}`}>
            {sectionComponent}
          </div> */


