'use strict';
import React from 'react';
import {Link} from 'react-router';
import {basename} from '../globals';
import token from '../auth/token';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  renderAccount(){
    if(token.isValid()){
      let {user} = token.content();

      return (
        <section className="account">
          <div>
            <h2 className="avatar">
              <img width="50" height="50" className="avatarimage" src={`${basename}/${user.foto}`} alt={`${user.voornaam} ${user.achternaam}`} />
              <span>{`${user.voornaam} ${user.achternaam}`}</span>
            </h2>
          </div>
          <Link to="/logout" className="logout" >Logout</Link>
        </section>
      );
    }
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
