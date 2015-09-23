module.exports = (...args) => {
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
  ret[Symbol.iterator] = function* () {
    let index = 0;
    while (true) {
      yield args[index];
      index = index === length - 1 ? 0 : index + 1;
    }
  };
  ret.size = args.length;
  ret.toArray = () => [...args];
  return ret;
};
