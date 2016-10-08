'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Web extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      loader: true
    };
  }

  componentDidMount(){
    this.setState({trigger: true});
  }

  componentDidUpdate(){
    let screen = this.refs.screen;
    screen.scrollTop = 0;
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
    let {image, id, direction, loader} = this.props;
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
          <div className="macbook">
            <img src={`${basename}/assets/img/macbook.png`} />
            <div className="screen-overlay" ref="screen">
              <ReactCSSTransitionGroup transitionName = {direction}
                transitionEnter = {true} transitionEnterTimeout = {1000}
                transitionLeave = {true} transitionLeaveTimeout = {1000}>
                <img key={id} src={`${basename}/assets/img/web/tiny/${image}.jpg`} onLoad={() => this.imageLoaded()} />
                {load}
              </ReactCSSTransitionGroup>
            </div>
          </div>
          <div>
            <div className="previousButton tablet" onClick={() => this.props.previousProject()}></div>
            <div className="nextButton" onClick={() => this.props.nextProject()}></div>
          </div>
      </div>);
    }

    return (
        <ReactCSSTransitionGroup transitionName = "up"
               transitionEnter = {true} transitionEnterTimeout = {1000}
               transitionLeave = {true} transitionLeaveTimeout = {1000}>
          {content}
        </ReactCSSTransitionGroup>
    );
  }
}
