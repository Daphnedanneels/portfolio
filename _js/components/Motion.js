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
    this.setState({thumb: ''});
  }

  render(){
    let {trigger, thumb} = this.state;
    let {url, id, title, loader} = this.props;
    let content, load;

    if(loader){
      load = <div className="loader"></div>;
    }

    if(trigger){
      content = (<div className="fullscreen web">
        <div className="corner-logo" onClick={() => this.backToMain()}>
          <button className="back-button">BACK</button>
        </div>
        <div className="full-container">
          <div className="previousButton" onClick={() => this.props.previousProject()}></div>
          <div className="tv">
            <img src={`${basename}/assets/img/tv.png`} />
            <iframe src={url} width="747" height="420" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            {load}
          </div>
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
