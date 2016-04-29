'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus, buildBodyBackup} from '../util';
import token from '../auth/token';

export const getMoestuinByUser = userId => {

  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/moestuinen?user_id=${userId}`, {headers})
  .then(checkStatus);
};

export const getMoestuinDetail = (id) => {
  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/moestuinen/${id}`, {headers})
  .then(checkStatus);
};

export const insertMoestuin = data => {

  let method = 'POST';
  let body = buildBodyBackup(data, ['naam', 'rijen', 'kolommen', 'eigenaar', 'foto']);
  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${basename}/api/moestuinen`, {method, body, headers})
    .then(checkStatus);
};

export default {
  getMoestuinByUser,
  insertMoestuin,
  getMoestuinDetail
};
