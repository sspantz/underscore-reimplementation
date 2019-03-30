# Underscore of Next Generation

## Contents

- [Underscore of Next Generation](#underscore-of-next-generation)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [Usage](#usage)
  - [Plan](#plan)
  - [Progress](#progress)
    - [Collections](#collections)
    - [Arrays](#arrays)
    - [Functions](#functions)
    - [Objects](#objects)
    - [Utility](#utility)
    - [OOP Style](#oop-style)
    - [Chaining](#chaining)
  - [Issues](#issues)
    - [Collections](#collections-1)
      - [Each](#each)

## Introduction

This repo is divided into two parts:

Part 1: the underscore.js library reimplementation
Part 2: my own notes during the journey of reimplementation

These two parts are combined to be my way of study javascript.

## Usage

```javascript
const _ = require("underscore");
_.map(list, callback);
```

## Plan

- [x] Impletement functions Collections
- [ ] Compare my [code](src) with [underscore](https://underscorejs.org/underscore.js)

## Progress

### Collections

- [x] each
- [x] map
- [x] reduce
- [x] reduceRight
- [x] find
- [x] filter
- [x] where
- [x] findWhere
- [x] reject
- [x] every
- [x] some
- [x] contains
- [x] invoke
- [x] pluck
- [x] max
- [x] min
- [x] sortBy
- [x] groupBy
- [x] indexBy
- [x] countBy
- [x] shuffle
- [x] sample
- [x] toArray
- [x] size
- [x] partition

### Arrays

- [ ] first
- [ ] initial
- [ ] last
- [ ] rest
- [ ] compact
- [ ] flatten
- [ ] without
- [ ] union
- [ ] intersection
- [ ] difference
- [ ] uniq
- [ ] zip
- [ ] unzip
- [ ] object
- [ ] chunk
- [ ] indexOf
- [ ] lastIndexOf
- [ ] sortedIndex
- [ ] findIndex
- [ ] findLastIndex
- [ ] range

### Functions

- [ ] bind
- [ ] bindAll
- [ ] partial
- [ ] memoize
- [ ] delay
- [ ] defer
- [ ] throttle
- [ ] debounce
- [ ] once
- [ ] after
- [ ] before
- [ ] wrap
- [ ] negate
- [ ] compose
- [ ] restArguments

### Objects

- [ ] keys
- [ ] allKeys
- [ ] values
- [ ] mapObject
- [ ] pairs
- [ ] invert
- [ ] create
- [ ] functions
- [ ] findKey
- [ ] extend
- [ ] extendOwn
- [ ] pick
- [ ] omit
- [ ] defaults
- [ ] clone
- [ ] tap
- [ ] has
- [ ] property
- [ ] propertyOf
- [ ] matcher
- [ ] isEqual
- [ ] isMatch
- [ ] isEmpty
- [ ] isElement
- [ ] isArray
- [ ] isObject
- [ ] isArguments
- [ ] isFunction
- [ ] isString
- [ ] isNumber
- [ ] isFinite
- [ ] isBoolean
- [ ] isDate
- [ ] isRegExp
- [ ] isError
- [ ] isSymbol
- [ ] isMap
- [ ] isWeakMap
- [ ] isSet
- [ ] isWeakSet
- [ ] isNaN
- [ ] isNull
- [ ] isUndefined

### Utility

- [ ] noConflict
- [ ] identity
- [ ] constant
- [ ] noop
- [ ] times
- [ ] random
- [ ] mixin
- [ ] iteratee
- [ ] uniqueId
- [ ] escape
- [ ] unescape
- [ ] result
- [ ] now
- [ ] template

### OOP Style

### Chaining

- [ ] chain
- [ ] value

## Issues

### Collections

#### Each

[underscore](https://underscorejs.org/underscore.js)

```javascript
// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
_.each = _.forEach = function(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};
```

[mycode](src/underscore.js)

```javascript
_.each = _.forEach = function each(list, callback, context) {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i, list);
    }
  } else {
    for (let key in list) {
      callback(list[key], key, list);
    }
  }
};
```
