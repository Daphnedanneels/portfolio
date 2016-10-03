'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Graphic extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      thumb: '-thumb'
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
    this.setState({thumb: ''});
  }

  render(){
    let {trigger, thumb} = this.state;
    let {image, id, title, description, loader} = this.props;
    let content, load;

    if(loader){
      load = <div className="loader"></div>;
    }

    console.log(loader);


    if(trigger){
      content = (<div className="fullscreen web">
        <div className="corner-logo" onClick={() => this.backToMain()}>
          <button className="back-button" onClick={() => this.backToMain()}>BACK</button>
        </div>
        <div className="full-container">
          <div className="previousButton" onClick={() => this.props.previousProject()}></div>
          <div className="round-container">
            <img className="rounded" key={id} src={`${basename}/assets/img/graphic/tiny/${image}.jpg`} onLoad={() => this.imageLoaded()} />
            <div className="hover-info">
              <div className="hover-text">
                <h2>{title}</h2>
                <div className="divider"></div>
                <p>{description}</p>
              </div>
            </div>
            {load}
          </div>
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
