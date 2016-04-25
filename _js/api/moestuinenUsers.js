'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus, buildBody} from '../util';
// import token from '../auth/token';

export const insertMoestuinUser = data => {

  let method = 'POST';
  let body = buildBody(data, ['users', 'moestuin_id']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/moestuinusers`, {method, body, headers})
    .then(checkStatus);
};

export default {
  insertMoestuinUser
};
