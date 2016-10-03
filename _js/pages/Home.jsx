'use strict';

import React, {Component} from 'react';
import {basename} from '../globals';
import {Graphic, Web, Motion, About} from '../components';

import {web, graphic, motion} from '../api';

// import {Link} from 'react-router';

export default class Home extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      component: '',
      project: 1,
      amount: '',
      direction: '',
      color: 'black',
      loader: true
    };
  }

  componentDidMount(){

  }

  getTotalProjects(name){
    if(name === 'web'){
      web.countProjects()
        .then(data => {
          this.setState({amount: data.amount});
        });
    }
    if(name === 'graphic'){
      graphic.countProjects()
        .then(data => {
          this.setState({amount: data.amount});
        });
    }
    if(name === 'motion'){
      motion.countProjects()
        .then(data => {
          this.setState({amount: data.amount});
        });
    }
  }

  getCurrentProject(name, project){

    console.log(project);
    if(name === 'web'){
      web.selectById(project)
        .then(data => {
          this.setState({web: data});
        });
    }
    if(name === 'graphic'){
      graphic.selectById(project)
        .then(data => {
          this.setState({graphic: data, loader: true});
        });
    }
    if(name === 'motion'){
      motion.selectById(project)
        .then(data => {
          this.setState({motion: data, loader: true});
        });
    }
  }

  imageLoaded(){
    this.setState({loader: false});
  }

  nextProject(name){
    let {project, amount} = this.state;
    if(project < amount){
      project++;
    } else {
      project = 1;
    }
    this.setState({project});
    this.setState({direction: 'previous'});
    this.getCurrentProject(name, project);
  }

  previousProject(name){
    let {project, amount} = this.state;
    if(project > 1){
      project--;
    }else{
      project = amount;
    }
    this.setState({project});
    this.setState({direction: 'next'});
    this.getCurrentProject(name, project);
  }

  renderScreenName(name, color){
    this.setState({color});
    this.setState({component: name});
    if(name !== 'about'){
      this.getTotalProjects(name);
      this.getCurrentProject(name, 1);
    }
  }

  backButton(){
    setTimeout(() => {
      this.setState({component: ''});
    }, 1000);
  }

  renderComponent(component){
    let {web, graphic, motion, direction, loader} = this.state;
    console.log(motion);
    if(component === 'graphic'){
      return <Graphic imageLoaded={() => this.imageLoaded()} loader={loader} backButton={() => this.backButton()} nextProject={() => this.nextProject('graphic')} previousProject={() => this.previousProject('graphic')} {...graphic}/>;
    }
    if(component === 'web' && web){
      return <Web backButton={() => this.backButton()} nextProject={() => this.nextProject('web')} previousProject={() => this.previousProject('web')} {...web} direction={direction}/>;
    }
    if(component === 'motion'){
      return <Motion backButton={() => this.backButton()} nextProject={() => this.nextProject('motion')} previousProject={() => this.previousProject('motion')} {...motion} direction={direction}/>;
    }
    if(component === 'about'){
      return <About backButton={() => this.backButton()}/>;
    }
  }

  render(){

    let {component, color} = this.state;

    return (
      <main className={`overlay`}>
        <header>
          <img className="logo-big" src={`${basename}/assets/img/logo.png`} alt="logo"/>
          <h1 className="naam">DAPHNE-O-LOGIC</h1>
        </header>
        <nav>
          <div className="arrow-graphic" onClick={() => this.renderScreenName('graphic', 'blue')}>
            <img src={`${basename}/assets/img/arrow.png`}/>
            <span>Graphic Design</span>
          </div>
          <div className="arrow-web" ref="web-button" onClick={() => this.renderScreenName('web', 'green')}>
            <span>Web Design</span>
            <img src={`${basename}/assets/img/arrow.png`}/>
          </div>
          <div className="arrow-motion" onClick={() => this.renderScreenName('motion', 'orange')}>
            <img src={`${basename}/assets/img/arrow.png`}/>
            <span>Motion Graphics</span>
          </div>
          <div className="arrow-cv" onClick={() => this.renderScreenName('about', 'purple')}>
            <span>About me</span>
            <img src={`${basename}/assets/img/arrow.png`}/>
          </div>
        </nav>
        <div className="social-media">
          <a href="https://www.facebook.com/daphne.danneels" target='_blank'><div className="facebook"></div></a>
          <a href="https://www.behance.net/DaphneDanneels"><div className="behance"></div></a>
          <a href="https://www.behance.net/DaphneDanneels"><div className="instagram"></div></a>
        </div>
        {this.renderComponent(component)}
      </main>
    );
  }
}
