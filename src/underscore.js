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
}

module.exports = _;