'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus, buildBody} from '../util';
// import token from '../auth/token';

export const getMoestuinByUser = userId => {
  // let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/moestuinen?user_id=${userId}`)
  .then(checkStatus);
};

export const getMoestuinDetail = (id) => {
  // let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/moestuinen/${id}`)
  .then(checkStatus);
};

export const insertMoestuin = data => {

  let method = 'POST';
  let body = buildBody(data, ['naam', 'rijen', 'kolommen', 'eigenaar']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/moestuinen`, {method, body, headers})
    .then(checkStatus);
};

export default {
  getMoestuinByUser,
  insertMoestuin,
  getMoestuinDetail
};
