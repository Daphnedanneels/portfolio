import {inRange, clamp} from 'lodash';

export default (value, start, end) => {
  if(isNaN(value)) return start;
  if(!inRange(value, start, end+1)) return clamp(value, start, end);
  else return false;
};
