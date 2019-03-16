(function () {
  /**
   *  Establish the root object, `window` (`self`) in the browser, `global`
   * on the server, or `this` in some virtual machines. We use `self`
   * instead of `window` for `WebWorker` support.
   */
  var root = (typeof self == "object" && self.self == self && self) ||
    // @ts-ignore
    (typeof global == "object" && global.global == global && global) ||
    this || {};


  var previousUnderscore = root._;

  // Create a safe reference to the Underscore object for use below.
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  // @ts-ignore
  if (typeof exports != "undefined" && !exports.nodeType) {
    // @ts-ignore
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }


  _.each = function each(list, callback) {
    if (Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        callback(list[i], i, list); }
    } else {
      for (let key in list) {
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

  _.map = function (list, callback) {
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

  _.select = _.filter = function (list, callback) {
    const storage = [];
    _.each(list, (value, key, list) => {
      if (callback(value, key, list) === true) {
        storage.push(value);
      }
    });
    return storage;
  };


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
  _.reduce = _.inject = _.foldl = function (list, callback, memo) {
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


  /**
   * The right-associative version of reduce. Foldr is not as useful
   * in JavaScript as it would be in a language with lazy evaluation.
   */

  _.reduceRight = function (list, callback, memo) {
    if (Array.isArray(list)) {
      list.reverse();
    } else {
      let len = 0;
      for (let key in list) {
        len++;
      };
      list.length = len;
      Array.prototype.reverse.call(list);
      delete list.length;
    };
    return _.reduce(list, callback, memo);
  }

  /**
   * Looks through each value in the list, returning the first one that
   * passes a truth test (predicate), or undefined if no value passes the
   * test. The function returns as soon as it finds an acceptable element,
   * and doesn't traverse the entire list. predicate is transformed through
   *  iteratee to facilitate shorthand syntaxes.
   */

  _.find = function (list, callback) {
    let result;
    let obj = {};
    if (Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (callback(list[i], i, list)) {
          return list[i];
        }
      }
    } else {
      for (let key in list) {
        if (callback(list[key], key, list)) {
          obj[key] = list[key];
          return obj;
        }
      }
    }
    return undefined;
  }

  _.every = function(list, callback) {
    let result = true;
    if (Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (callback(list[i], i , list) === false) return false;
      }
    } else {
      for (let key in list) {
        if (callback(list[key], key, list) === false) return false;
      }
    }
    return result;
  }

  /**
   * Returns true if any of the values in the list pass the predicate truth test.
   * Short-circuits and stops traversing the list if a true element is found. predicate
   * is transformed through iteratee to facilitate shorthand syntaxes.
   */
  _.some = _.any = function(list, callback) {
    for (let i = 0; i < list.length; i++) {
      if (callback === undefined) {
        if (list[i]) return true;
      } else {
        if (callback(list[i], i, list)) return true;
      }
    }
    return false;
  }

  /**
   * Looks through each value in the list, returning an array of all the values that
   * matches the key-value pairs listed in properties.
   */
  _.where = function(list, properties) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
      let judge = true;
      for (let key in properties) {
        if (properties[key] !== list[i][key]) {
          judge = false;
          break;
        }
      }
      if (judge) result.push(list[i])
    }
    return result;
  }

  /**
   * [findWhere description]
   * @param  {[object]} list       [description]
   * @param  {[object]} properties [description]
   * @return {[object, undefined]} result     [description]
   */
  // Looks through the list and returns the first value that matches
  // all of the key-value pairs listed in properties.
  // If no match is found, or if list is empty, undefined will be returned.
  _.findWhere = function(list, properties) {
    let passed = true;
    for (let i = 0; i < list.length; i++) {
      for (let key in properties) {
        if (list[i][key] !== properties[key]) {
          passed = false;
          break;
        }
      }
      if (passed) return list[i];
      else passed = true;
    }
    return undefined;
  }

  _.reject = function(list, predicate) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i], i, list)) result.push(list[i]);
    }
    return result;
  }

  _.contains = _.include = _.includes = function(list, value, fromIndex) {
    const begin = fromIndex && !isNaN(fromIndex) && fromIndex < list.length? fromIndex: 0;
    for (let i = begin; i < list.length; i++) {
      if (value === list[i]) return true;
    }
    return false;
  }

  _.max = function(list, iteratee) {
    let max;
    let obj;
    if (iteratee === undefined) iteratee = (value) => { return value };
    if (list === undefined) return Infinity;
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        max = iteratee(list[i]);
        obj = list[i];
      }
      if (max < iteratee(list[i])) {
        max = iteratee(list[i]);
        obj = list[i];
      }
    }
    return obj;
  };

  _.min = function(list, iteratee) {
    var min;
    var obj;
    if (iteratee === undefined) iteratee = (value) => { return value };
    if (list === undefined) return Infinity;
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        min = iteratee(list[i])
        obj = list[i];
      };
      if (min > iteratee(list[i])) {
        min = iteratee(list[i]);
        obj = list[i];
      }
    }
    return obj;
  }

  _.size = function(list) {
    let result = 0;
    for (let key in list) {
      result++;
    }
    return result;
  }

  /**
   * [shuffle description]
   * @param  {[array]} list [description]
   * @return {[array]} result [description]
   */
  // Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
  _.shuffle = function(list) {
    const result = [];
    const len = list.length;
    let randomIndex = 0;
    for (let i = 0; i < len; i++) {
      randomIndex = Math.floor(Math.random() * list.length);
      result.push(list[randomIndex]);
      list.splice(randomIndex, 1);
    }
    return result;
  }

  // pickOne does not exist in original underscore.js
  _.pickOne = function(list) {
    let result;
    let len = 0;
    for (let key in list) {
      len++;
    }
    const randomIndex = Math.floor(Math.random() * len);
    if (Array.isArray(list)) {
      result = list[randomIndex];
    } else {
      let counter = 0;
      const obj = {};
      for (let key in list) {
        if (counter === randomIndex) {
          obj[key] = list[key];
          result = obj;
          break;
        }
        counter++;
      }
    }
    return result;
  }

  _.sample = function(list, n=1) {
    const isArray = Array.isArray(list);
    const result = Array.isArray(list)? []: {};
    if (isArray) {
      for (let i = 0; i < n; i++) {
        const one = _.pickOne(list);
        result.push(one);
        list.splice(list.indexOf(one), 1);
      }
    } else {
      for (let i = 0; i < n; i++) {
        const one = _.pickOne(list);
        let theKey;
        for (let key in list) {
          if (one[key] === list[key]) {
            theKey = key;
            break;
          }
        }
        result[theKey] = one[theKey];
        delete list[theKey];
      }
    }
    return result;
  }

/**
 * _.groupBy(list, iteratee, [context])
 * Splits a collection into sets, grouped by the result of running each value
 * through iteratee. If iteratee is a string instead of a function, groups by
 * the property named by iteratee on each of the values.
 */
  _.groupBy = function(list, iteratee) {
    var result = {};
    var callback;
    if (typeof iteratee === "string") callback = value => value[iteratee];
    else callback = iteratee;
    for (let i = 0; i < list.length; i++) {
      var key = callback(list[i], i, list);
      if (result[key] === undefined) result[key] = [];
      result[key].push(list[i]);
    }
    return result;
  };

  /**
   * Given a list, and an iteratee function that returns a key for each element
   * in the list (or a property name), returns an object with an index of each
   * item. Just like groupBy, but for when you know your keys are unique.
   */
  _.indexBy = function(list, iteratee) {
    var result = {};
    _.each(list, (value, key, list) => {
      let theKey = (typeof iteratee === "string")? value[iteratee]: value[iteratee(value, key, list)];
      if (result[theKey] === undefined) result[theKey] = {};
      result[theKey] = value;
    });
    return result;
  };

  /**
   * Sorts a list into groups and returns a count for the number of objects in
   * each group. Similar to groupBy, but instead of returning a list of values,
   * returns a count for the number of values in that group.
   */
  _.countBy = function(list, iteratee) {
    var result = {};
    _.each(list, (value, key, list) => {
      var theKey = iteratee(value, key, list);
      if (result[theKey] === undefined) result[theKey] = 0;
      result[theKey]++;
    });
    return result;
  }
}());
