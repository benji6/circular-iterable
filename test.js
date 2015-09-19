import test from 'tape';
import circularIterable from './';

const testData = Object.freeze(Array.from({length: 256}, (x, i) => i));
const cI = circularIterable(...testData);

const syncTest = (str, f) => test(str, t => (f(t), t.end()));

syncTest('can access data at index',
         t => testData.map(x => t.equal(cI(x), x)));

syncTest('can access data at excessive index',
         t => testData.map(x => x + testData.length * 2)
                      .map((x, i) => t.equal(cI(x), testData[i])));

syncTest('can access data at negative index',
         t => testData.map(x => x - testData.length * 2)
                      .map((x, i) => t.equal(cI(x), testData[i])));

syncTest('implements iterator protocol', t => {
  const iterator = cI[Symbol.iterator]();
  testData.map(x => t.equal(iterator.next().value, x));
  testData.map(x => t.equal(iterator.next().value, x));
  testData.map(x => t.equal(iterator.next().value, x));
});

// test('pointer can be reset', t => 1);
