'use strict';

import fetch from 'isomorphic-fetch';
import {buildBodyBackup, checkStatus} from '../util';
import {basename} from '../globals';
import token from '../auth/token';

// import token from '../auth/token';

let base = '/api/users';

export const insert = data => {

  let method = 'POST';
  let body = buildBodyBackup(data, ['voornaam', 'achternaam', 'email', 'wachtwoord', 'foto']);
  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${basename}${base}`, {method, body, headers})
    .then(checkStatus);
};

export const selectAllMin = () => {

  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}${base}`, {headers})
    .then(checkStatus);
};


export const selectAllByMoestuin = moestuin_id => {

  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}${base}?moestuin_id=${moestuin_id}`, {headers})
    .then(checkStatus);
};

export const selectAllMinFilter = search => {

  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}${base}?q=${search.search}`, {headers})
    .then(checkStatus);
};

export default {
  insert,
  selectAllMin,
  selectAllMinFilter,
  selectAllByMoestuin
};
