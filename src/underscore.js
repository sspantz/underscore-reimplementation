const _ = {};

_.each = function(list, callback) {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i, list);
    }
  } else {
    for (key in list) {
      callback(list[key], key, list);
    }
  }
};

/**
 * map_.map(list, iteratee, [context]) 
 * Produces a new array of values by mapping each value in list through a 
 * transformation function (iteratee). The iteratee is passed three 
 * arguments: the value, then the index (or key) of the iteration, and 
 * finally a reference to the entire list.
 * _.map([1, 2, 3], function(num){ return num * 3; });
 * => [3, 6, 9]
 * _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
 * => [3, 6, 9]
 * _.map([[1, 2], [3, 4]], _.first);
 * => [1, 3]
 */

_.map = function(list, callback) {
  const storage = [];
  _.each(list, (item, key, collection) => {
    storage.push(callback(item, key, collection));
  });
  return storage;
};

/**
 * _.filter(list, predicate, [context]) Alias: select
 * Looks through each value in the list, returning an array of all
 * the values that pass a truth test (predicate). predicate
 * is transformed through iteratee to facilitate shorthand 
 * syntaxes.
 */

_.filter = function(list, callback) {
  const storage = [];
  _.each(list, (value, key, list) => {
    if (callback(value, key, list) === true) {
      storage.push(value);
    }
  })
  return storage;
}

_.select = _.filter

/**
 * _.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl
 * Also known as inject and foldl, reduce boils down a list of values 
 * into a single value. Memo is the initial state of the reduction, and
 * each successive step of it should be returned by iteratee. The
 * iteratee is passed four arguments: the memo, then the value and index
 * (or key) of the iteration, and finally a reference to the entire list. 
 * 
 * If no memo is passed to the initial invocation of reduce, the iteratee 
 * is not invoked on the first element of the list. The first element is 
 * instead passed as the memo in the invocation of the iteratee on the
 * next element in the list.
 */
_.reduce = function(list, callback, memo) {
  let result = memo;
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (i === 0 && result === undefined) {
        result = list[i];
      } else {
        result = callback(result, list[i], i);
      }
    } 
  } else {
    for (let key in list) {
      if (result === undefined) {
        result = list[key];
      } else {
        result = callback(result, list[key], key);
      }
    }
  }
  return result;
}

_.inject = _.reduce
_.foldl  = _.reduce

/**
 * The right-associative version of reduce. Foldr is not as useful 
 * in JavaScript as it would be in a language with lazy evaluation.
 */

_.reduceRight = function(list, callback, memo) {
  if (Array.isArray(list)) {
    list.reverse();
  } else {
    let len = 0;
    for (let key in list) {
      len++;
    };
    list.length = len;
    Array.prototype.reverse.call(list);
  };
  return _.reduce(list, callback, memo);
}

module.exports = _;