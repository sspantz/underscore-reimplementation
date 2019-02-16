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

module.exports = _;