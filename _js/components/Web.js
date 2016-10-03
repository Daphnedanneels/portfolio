'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Web extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      thumb: '-thumb',
      loader: true
    };
  }

  componentDidMount(){
    this.setState({trigger: true});
  }

  componentDidUpdate(){
    // if(this.refs.screen){
      let screen = this.refs.screen;
      screen.scrollTop = 0;
    // }
  }

  backToMain(){
    this.setState({trigger: false});
    this.props.backButton();
  }

  imageLoaded(){
    console.log('done');
    this.setState({thumb: '', loader: false});
  }

  render(){
    let {trigger, thumb, loader} = this.state;
    let {image, id, direction} = this.props;
    let content, load, url;

    if(loader){
      load = <div className="loader"></div>;
    }


    if(trigger){
      content = (<div className="fullscreen web">
        <div className="corner-logo" onClick={() => this.backToMain()}>
          <button className="back-button" onClick={() => this.backToMain()}>BACK</button>
        </div>
        <div className="full-container">
          <div className="previousButton" onClick={() => this.props.previousProject()}></div>
          <div className="macbook">
            <img src={`${basename}/assets/img/macbook.png`} />
            <div className="screen-overlay" ref="screen">
              <ReactCSSTransitionGroup transitionName = {direction}
                transitionEnter = {true} transitionEnterTimeout = {1000}
                transitionLeave = {true} transitionLeaveTimeout = {1000}>
                <img key={id} src={`${basename}/assets/img/web/tiny/${image}.jpg`} onLoad={() => this.imageLoaded()} />
                <img key={image} src={`${basename}/assets/img/web/${image}${thumb}.jpg`}/>
                {load}
              </ReactCSSTransitionGroup>
            </div>
            <div className="info-button" onClick={() => this.showInfo()}><span>i</span></div>
          </div>
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
