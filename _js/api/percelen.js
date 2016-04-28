'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus, buildBody} from '../util';
// import token from '../auth/token';

export const insertPercelen = data => {

  let method = 'POST';
  let body = buildBody(data, ['rijen', 'kolommen', 'moestuin_id']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/percelen`, {method, body, headers})
    .then(checkStatus);
};

export const getPercelenByMoestuin = id =>{
  return fetch(`${basename}/api/percelen?moestuin_id=${id}`)
  .then(checkStatus);
};

export const updatePercelen = data =>{

  let method = 'PUT';
  let body = buildBody(data, ['perceel_id', 'plant_id', 'action']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/percelen`, {method, body, headers})
    .then(checkStatus);

};

export const updateWater = data =>{

  let method = 'PUT';
  let body = buildBody(data, ['perceel_id', 'action', 'timestamp']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/percelen`, {method, body, headers})
    .then(checkStatus);
};

export default {
  getPercelenByMoestuin,
  insertPercelen,
  updatePercelen
};
