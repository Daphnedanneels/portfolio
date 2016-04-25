'use strict';

import jwt from 'jsonwebtoken';

export const get = () => localStorage.getItem('token');
export const set = token => localStorage.setItem('token', token);
export const content = () => jwt.decode(get());

export const isValid = () => {
  let token = content();

  if(!token) return false;

  //zolang de token tijd groter is dan 0, is deze valid
  let valid = (token.exp - Math.floor(Date.now() / 1000)) > 0;
  return valid;
};

export const clear = () => {
  localStorage.removeItem('token');
  return !localStorage.getItem('token');
};

export default {
  get,
  set,
  content,
  isValid,
  clear
};
