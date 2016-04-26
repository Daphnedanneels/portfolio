'use strict';

import React from 'react';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import token from '../auth/token';

import {App, Home, Login, Register, Detail, Maakmoestuin} from '../pages/';
import {basename} from '../globals/';

const logout = (nextState, replace) => {
  if(token.clear()){
    replace({pathname: '/login'});
  }
};

const removeUser = (nextState, replace)=>{
  console.log('removed user');
  replace({pathname: '/detail'});
};

const isLoggedIn = (nextState, replace) => {
  if(!token.isValid()) {
    token.clear();
  }

  if(!token.content()){
    replace({pathname: '/login'});
  }
};

export default () => (
  <Router history={useRouterHistory(createHistory)({basename})}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={isLoggedIn} />
      <Route path='home' component={Home} onEnter={isLoggedIn}/>
      <Route path='login' component={Login}/>
      <Route path='register' component={Register}/>
      <Route path='moestuin/:id' component={Detail} onEnter={isLoggedIn}/>
      <Route path='maakmoestuin' component={Maakmoestuin} onEnter={isLoggedIn}/>
      <Route path='removeuser' onEnter={removeUser}/>
      <Route path='logout' onEnter={logout}/>
    </Route>
  </Router>
);

