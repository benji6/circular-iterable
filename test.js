import test from 'tape';
import circularIterable from './';

const testDataLength = 256;
const testData = Object.freeze(Array.from({length: testDataLength}, (x, i) => i));
const cI = circularIterable(...testData);

const syncTest = (str, f) => test(str, t => (f(t), t.end()));
const tap = f => (...xs) => (f(...xs), xs[0]);

syncTest('can access data at index',
         t => testData.map(x => t.equal(cI(x), x)));

syncTest('can access data at excessive index',
         t => testData.map(x => x + testDataLength)
                      .map(tap((x, i) => t.equal(cI(x), testData[i])))
                      .map(x => x + testDataLength)
                      .map((x, i) => t.equal(cI(x), testData[i])));

syncTest('can access data at negative index',
         t => testData.map(x => x - testDataLength)
                      .map(tap((x, i) => t.equal(cI(x), testData[i])))
                      .map(x => x - testDataLength)
                      .map((x, i) => t.equal(cI(x), testData[i])));

syncTest('implements iterator protocol', t => {
  const iterator = cI[Symbol.iterator]();
  [...testData, ...testData, ...testData]
    .map(x => t.deepEqual(iterator.next(), {value: x, done: false}));
});

syncTest('has size property',
         t => t.equal(cI.size, testDataLength));

syncTest('has toArray method',
         t => t.deepEqual(cI.toArray(), testData));

syncTest('new iterators are unaffected by state of old iterators', t => {
  const iterator = cI[Symbol.iterator]();
  const sliceTo = Math.round(testData.length / 2);
  const testVal = testData.slice(0, sliceTo)
                          .reduce(::iterator.next, null)

  t.deepEqual(testVal, {value: testData[sliceTo - 1], done: false});
  const newIterator = cI[Symbol.iterator]();
  t.deepEqual(newIterator.next(), {value: 0, done: false});
  t.deepEqual(testVal, {value: testData[sliceTo - 1], done: false});
});
