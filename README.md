# circular-iterable

[![npm version](https://badge.fury.io/js/circular-iterable.svg)](http://badge.fury.io/js/circular-iterable)
[![Build Status](https://travis-ci.org/benji6/circular-iterable.svg?branch=master)](https://travis-ci.org/benji6/circular-iterable)

Create circular, iterable data structures in JS.

## Transpiling

**NB This library is written in ES2015 and implements the iterable and iterator protocols and also makes use of a generator function. As such you will either need to be using an ES2015 runtime or transpiling your code.**

If using Babel then ensure you have the `babel-runtime` package installed. This module should work with `babelify` with no further configuration. If using in node Babel will not transpile node_modules by default and you will have to modify its ignore regex, check out the docs for more info, here is a CLI example:

```bash
babel-node --ignore node_modules\/!circular-iterable/
```

## Installation

```bash
npm i -S circular-iterable
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

## Transducer Example

```javascript
import circularIterable from 'circular-iterable';
import {append, compose, flip, map, multiply, take, transduce} from 'ramda';

const circularData = circularIterable(1, 2, 3);
const transducer = compose(map(multiply(3)), take(5));
transduce(transducer, flip(append), [], circularData); // => [3, 6, 9, 3, 6]
```

## Implementation

There is no deep cloning of elements passed to circular-iterable so mutate them at your own peril.
