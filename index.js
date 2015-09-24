export default (...args) => {
  const {length} = args;
  const circularData = i => args[(i % length + length) % length];
  circularData[Symbol.iterator] = function* () {
    let index = 0;
    while (true) {
      yield args[index];
      index = index === length - 1 ? 0 : index + 1;
    }
  };
  circularData.size = args.length;
  circularData.toArray = () => [...args];
  return circularData;
};
