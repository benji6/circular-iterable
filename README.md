# circular-iterable

Create circular, iterable data structures in JS.

## Installation

```bash
npm i -D circular-iterable
```

## API

#### Import

```javascript
import circularIterable from 'circular-iterable';
```

#### Create

```javascript
const circularData = circularIterable(1, 2, 3);

// alternatively:
const circularDataFromArray = circularIterable(...[1, 2, 3]);
```

#### Access Data

```javascript
circularData(-2); // => 2
circularData(-1); // => 3
circularData(0); // => 1
circularData(1); // => 2
circularData(2); // => 3
circularData(3); // => 1
circularData(4); // => 2
circularData(256); // => 2
circularData(-256); // => 3
```

#### Create Iterators

```javascript
const iterator = circularData[Symbol.iterator]();
iterator.next(); // => {value: 1, done: false}
iterator.next(); // => {value: 2, done: false}
iterator.next(); // => {value: 3, done: false}
iterator.next(); // => {value: 1, done: false}
iterator.next(); // => {value: 2, done: false}
// ad infinitum...

// state of iterators is kept separate:
const newIterator = circularData[Symbol.iterator]();
newIterator.next(); // => {value: 1, done: false}
iterator.next(); // => {value: 3, done: false}
```

#### Size

```javascript
circularData.size; // => 3
```

#### toArray

```javascript
circularData.toArray(); // => [1, 2, 3]
```

## Implementation

This library is written in ES2015 and implements the iterable and iterator protocols. As such you will either need to be using an ES2015 runtime or transpiling your code.

It's also worth mentioning that there is no deep cloning of elements passed to circular-iterable so mutate them at your own peril.
