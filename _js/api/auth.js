'use strict';

import fetch from 'isomorphic-fetch';
import {basename} from '../globals';
import {checkStatus, buildBody} from '../util/';
import {clientId} from '../globals';

export const login = data => {

  let body = buildBody(data, ['email', 'wachtwoord'], {clientId});
  let method = 'POST';
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/auth`, {body, method, headers})
    .then(checkStatus)
    .then(({token}) => token);
};

