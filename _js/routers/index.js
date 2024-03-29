'use strict';

import React from 'react';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHistory} from 'history';

import {App, Home} from '../pages/';
import {basename} from '../globals/';

export default () => (
  <Router history={useRouterHistory(createHistory)({basename})}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path='home' component={Home}/>
    </Route>
  </Router>
);

