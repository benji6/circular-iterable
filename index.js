export default (...args) => {
  const {length} = args;
  const ret = i => {
    while (i >= length) {
      i -= length;
    }
    while (i < 0) {
      i += length;
    }
    return args[i];
  };
  let index = 0;
  ret[Symbol.iterator] = function* () {
    while (true) {
      yield args[index];
      index = index === length - 1 ? 0 : index + 1;
    }
  };
  return ret;
};
