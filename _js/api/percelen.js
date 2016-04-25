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


export const updatePercelen = data =>{

  let method = 'PUT';
  let body = buildBody(data, ['perceel_id', 'plant_id']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(`${basename}/api/percelen`, {method, body, headers})
    .then(checkStatus);

};

export default {
  insertPercelen,
  updatePercelen
};
