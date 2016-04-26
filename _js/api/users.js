'use strict';

import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals';

// import token from '../auth/token';

let base = '/api/users';

export const insert = data => {

  let method = 'POST';
  let body = buildBody(data, ['voornaam', 'achternaam', 'email', 'wachtwoord']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}${base}`, {method, body, headers})
    .then(checkStatus);
};

export const selectAllMin = () => {

  // x-auth-token is een standaard naam die we gebruiken
  // let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${basename}${base}`)
    .then(checkStatus);

};


export const selectAllByMoestuin = moestuin_id => {

  // x-auth-token is een standaard naam die we gebruiken
  // let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${basename}${base}?moestuin_id=${moestuin_id}`)
    .then(checkStatus);

};


export const selectAllMinFilter = search => {

  // x-auth-token is een standaard naam die we gebruiken
  // let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${basename}${base}?params=${search.search}`)
    .then(checkStatus);

};

export default {
  insert,
  selectAllMin,
  selectAllMinFilter,
  selectAllByMoestuin
};
