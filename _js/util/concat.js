export default (value, cutoff = 45) => {
  if(value.length < cutoff) return value;
  return `${value.substr(0, cutoff)}...`;
};
