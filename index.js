export default (...args) => {
  const {length} = args;
  let index = 0;
  const ret = i => {
    while (i >= length) {
      i -= length;
    }
    while (i < 0) {
      i += length;
    }
    return args[i];
  };
  ret[Symbol.iterator] = function* () {
    while (true) {
      yield args[index];
      index = index === length - 1 ? 0 : index + 1;
    }
  };
  return ret;
};
