'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus, buildBody} from '../util';
import token from '../auth/token';

export const insertMoestuinUser = data => {

  let method = 'POST';
  let body = buildBody(data, ['users', 'moestuin_id']);
  let headers = new Headers({'Content-Type': 'application/json', 'x-auth-token': token.get()});

  return fetch(`${basename}/api/moestuinusers`, {method, body, headers})
    .then(checkStatus);
};


export const deleteMoestuinUsers = data => {

  let method = 'DELETE';
  let body = buildBody(data, ['user_id', 'moestuin_id']);
  let headers = new Headers({'Content-Type': 'application/json', 'x-auth-token': token.get()});

  return fetch(`${basename}/api/moestuinusers?user_id=${data.user_id}&moestuin_id=${data.moestuin_id}`, {method, body, headers})
    .then(checkStatus);
};

export default {
  insertMoestuinUser,
  deleteMoestuinUsers
};
