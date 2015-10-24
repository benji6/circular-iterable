export default (...args) => {
  const {length} = args;
  const circularData = i => args[(i % length + length) % length];
  circularData[Symbol.iterator] = function* () {
    while (true) yield* args[Symbol.iterator]();
  };
  circularData.toArray = () => [...args];
  return circularData;
};
