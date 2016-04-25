'use strict';

import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';
import {basename} from '../globals';

export const getPlanten = () => {
  // let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${basename}/api/planten`)
  .then(checkStatus);
};

export default {
  getPlanten
};
