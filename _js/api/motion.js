'use strict';

import {basename} from '../globals';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';

export const selectAll = () => {
  let headers = new Headers({'Content-Type': 'application/json'});
  return fetch(`${basename}/api/motion`, {headers})
  .then(checkStatus);
};

export const countProjects = () => {
  let headers = new Headers({'Content-Type': 'application/json'});
  return fetch(`${basename}/api/motion?count=true`, {headers})
  .then(checkStatus);
};

export const selectById = (id) => {
  let headers = new Headers({'Content-Type': 'application/json'});
  return fetch(`${basename}/api/motion/${id}`, {headers})
  .then(checkStatus);
};

export default {
  selectAll,
  selectById,
  countProjects
};
