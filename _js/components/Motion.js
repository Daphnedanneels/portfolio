'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Graphic extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      animate: 'animate'
    };
  }

  componentDidMount(){
    this.setState({trigger: true});
    setTimeout(() => {
      this.setState({animate: ''});
    }, 1000);
  }

  backToMain(){
    this.setState({trigger: false});
    this.props.backButton();
  }

  render(){
    let {trigger, animate} = this.state;
    let {url, id} = this.props;
    let content;

    if(trigger){
      content = (<div className="fullscreen web">
          <div className={`corner-logo ${animate}`} onClick={() => this.backToMain()}>
            <img src={`${basename}/assets/img/logo.png`} alt=""/>
            <button>BACK</button>
          </div>
          <div className="previousButton desktop" onClick={() => this.props.previousProject()}></div>
          <div className="tv">
            <img src={`${basename}/assets/img/tv.png`} />
            <iframe src={url} key={id} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>
          <div>
            <div className="previousButton tablet" onClick={() => this.props.previousProject()}></div>
            <div className="nextButton" onClick={() => this.props.nextProject()}></div>
          </div>
      </div>);
    }

    return (
        <ReactCSSTransitionGroup transitionName = "right"
               transitionEnter = {true} transitionEnterTimeout = {1000}
               transitionLeave = {true} transitionLeaveTimeout = {1000}>
          {content}
        </ReactCSSTransitionGroup>
    );
  }
}
