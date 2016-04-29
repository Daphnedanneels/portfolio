'use strict';

import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';
import {basename} from '../globals';
import token from '../auth/token';

export const getPlanten = () => {

  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/planten`, {headers})
  .then(checkStatus);
};

export default {
  getPlanten
};
