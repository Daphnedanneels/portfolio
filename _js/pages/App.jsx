'use strict';
import React from 'react';
import {Link} from 'react-router';
import {basename} from '../globals';
import token from '../auth/token';
// import {checkStatus} from '../util';
// import fetch from 'isomorphic-fetch';
// import {find, filter} from 'lodash';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    /*this.state = {
      oneliners: [],
      onelinersFetched: false
    };*/
  }

  renderAccount(){
    if(token.isValid()){
      let {user} = token.content();

      return (
        <section className="account">
          <div>
            <h2 className="avatar">
              <img width="50" height="50" className="avatarimage" src={`${basename}/assets/img/${user.foto}`} alt={`${user.voornaam} ${user.achternaam}`} />
              <span>{`${user.voornaam} ${user.achternaam}`}</span>
            </h2>
          </div>
          <Link to="/logout" className="logout" >Logout</Link>
        </section>
      );
    }
  }

  //na render functie
  componentWillMount(){
    /*
    fetch(`${basename}/api/oneliners`)
   .then(checkStatus)
   .then(r => r.json())
   .then(data =>{
    // console.log(data);
    this.setState({oneliners: data, onelinersFetched: true});
   })
   .catch(()=>{
    console.log('failed to get cool onliners');
   });*/
  }

  render(){

    let {children} = this.props;

    return (
      <div className="container">
        <header className="topbar menu">
          <Link to="/home">
          <h1 className="logo">
            <img src={`${basename}/assets/logo/logo.svg`} width="40" height="40" alt="moestuinbeheerder" />
            <span>Moestuinbeheerder</span>
          </h1>
          </Link>
          {this.renderAccount()}
        </header>
        <div class="contentRender">
        {children}
        </div>
      </div>
    );
  }
}
