'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Graphic extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {

    };
  }

  componentDidMount(){
    this.setState({trigger: true});
  }

  backToMain(){
    this.setState({trigger: false});
    this.props.backButton();
  }

  imageLoaded(){
    this.props.imageLoaded();
  }

  render(){
    let {trigger} = this.state;
    let {image, id, title, description, loader} = this.props;
    let content, load;

    if(loader){
      load = <div className="loader"></div>;
    }


    if(trigger){
      content = (<div className="fullscreen web">
          <div className="corner-logo" onClick={() => this.backToMain()}>
            <img src={`${basename}/assets/img/logo.png`} alt=""/>
            <button>BACK</button>
          </div>
          <div className="previousButton desktop" onClick={() => this.props.previousProject()}></div>
          <div className="round-container">
            <ReactCSSTransitionGroup transitionName = 'blur'
              transitionEnter = {true} transitionEnterTimeout = {500}
              transitionLeave = {true} transitionLeaveTimeout = {500}>
              <img className="rounded" key={id} src={`${basename}/assets/img/graphic/tiny/${image}.jpg`} onLoad={() => this.imageLoaded()} />
            </ReactCSSTransitionGroup>
            <div className="hover-info">
              <div className="hover-text">
                <h2>{title}</h2>
                <div className="divider"></div>
                <p>{description}</p>
              </div>
            </div>
            {load}
          </div>
          <div>
            <div className="previousButton tablet" onClick={() => this.props.previousProject()}></div>
            <div className="nextButton" onClick={() => this.props.nextProject()}></div>
          </div>
      </div>);
    }

    return (
        <ReactCSSTransitionGroup transitionName = "down"
               transitionEnter = {true} transitionEnterTimeout = {1000}
               transitionLeave = {true} transitionLeaveTimeout = {1000}>
          {content}
        </ReactCSSTransitionGroup>
    );
  }
}
