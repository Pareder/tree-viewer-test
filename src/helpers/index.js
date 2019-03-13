const trimString = (str) => {
  let phrase = '';
  if (str.includes('storages')) {
    phrase = 'storages-';
  } else if (str.includes('interfaces')) {
    phrase = 'interfaces-';
  }
  if (phrase) {
    return str.split(phrase)[1];
  } else {
    return str;
  }
}

export { trimString };