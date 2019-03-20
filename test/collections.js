const _ = require('../src/underscore')
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Collections', function () {

  describe('Availability Test', function () {

    it('should be OK!', function () {
      expect(true).to.be.equal(true);
    });

  });

  describe('Each Test', function () {

    const list = [1, 2, 3];

    it('should return 6', function () {
      let sum = 0;
      _.each(list, (value, key, list) => {
        sum += value;
      });
      expect(sum).to.equal(6);
    });

    it('should return [1, 2, 3]', function () {
      const list2 = [];
      _.each(list, (value, key, list) => {
        list2.push(value);
      });
      expect(list2).to.eql([1, 2, 3]);
    });
  });

  describe('Map Test', function () {

    const list = [1, 2, 3];
    const dic = {
      one: 1,
      two: 2,
      three: 3
    };

    it('should return [3, 6, 9] from [1, 2, 3]', function () {
      const list2 = _.map(list, function (num) {
        return num * 3;
      });
      const length = list2.length;
      expect(list2).to.eql([3, 6, 9]);
    });

    it('should return [3, 6, 9] from {one: 1, two: 2, three: 3}', function () {
      const list2 = _.map(dic, (item, key, list) => {
        return item * 3;
      });
      expect(list2).to.eql([3, 6, 9]);
    })
  });

  describe('Filter Test', function () {

    const list = [1, 2, 3, 4, 5];

    it('should return [1, 2, 3]', function () {
      const list2 = _.filter(list, function (value) {
        return value < 4;
      })
      expect(list2).to.eql([1, 2, 3]);
    });

    it('should return [4, 5]', function () {
      const list2 = _.select(list, function (value) {
        return value > 3;
      })
      expect(list2).to.eql([4, 5]);
    });


    it('should return [2, 4]', function () {
      const list2 = _.filter(list, function (value) {
        return value % 2 === 0;
      });
      expect(list2).to.eql([2, 4]);
    });
  })

  describe('Reduce Test', function () {

    const list = [1, 2, 3, 4, 5];
    const obj = {
      'a': 1,
      'b': 2,
      'c': 1,
      'd': 2,
      'e': 3
    };

    it("should return 15", function () {
      const sum = _.reduce(list, (memo, value, key) => {
        return memo + value;
      })
      expect(sum).to.equal(15);
    })

    it("should return {1: [a, c], 2: [b, d], 3: [e]}", function () {
      const result = _.reduce(obj, (memo, value, key) => {
        (memo[value] || (memo[value] = [])).push(key);
        return memo;
      }, {})
      expect(result).to.eql({
        1: ['a', 'c'],
        2: ['b', 'd'],
        3: ['e']
      })
    })

  })

  describe('ReduceRight Test', function () {

    const list = [
      [0, 1],
      [2, 3],
      [4, 5]
    ];
    const letters = ['a', 'b', 'c', 'd', 'e'];
    const obj = {
      'a': 1,
      'b': 2,
      'c': 1,
      'd': 2,
      'e': 3
    };

    it("should return [4, 5, 2, 3, 0, 1]", function () {
      let flat = _.reduceRight(list, function (a, b) {
        return a.concat(b);
      }, []);
      expect(flat).to.eql([4, 5, 2, 3, 0, 1]);
    });

    it("should return 'edcba'", function () {
      let result = _.reduceRight(letters, function (memo, value) {
        return memo + value;
      })
      expect(result).to.equal('edcba');
    });

    it("should return {1: [a, c], 2: [b, d], 3: [e]}", function () {
      const result = _.reduceRight(obj, (memo, value, key) => {
        (memo[value] || (memo[value] = [])).push(key);
        return memo;
      }, {})
      expect(result).to.eql({
        1: ['a', 'c'],
        2: ['b', 'd'],
        3: ['e']
      })
    });
  })

  describe('Find Test', function () {

    it("should return undefined", function () {
      const result = _.find([1, 3, 5], function (num) {
        return num % 2 == 0;
      });
      expect(result).to.equal(undefined);
    })

    it("should return 2", function () {
      const result = _.find([1, 2, 3, 4, 5, 6], function (num) {
        return num % 2 == 0;
      });
      expect(result).to.equal(2);
    })

    it("should return {b: 2}", function () {
      const result = _.find({
        a: 1,
        b: 2,
        c: 1
      }, function (value, key) {
        return value > 1;
      })
      expect(result).to.eql({
        b: 2
      });
    })
  })

  describe('Every Test', function () {

    it("should return false", function () {
      const result = _.every([2, 4, 5], function (num) {
        return num % 2 == 0;
      });
      expect(result).to.equal(false);
    });

    it("should return true", function () {
      const result = _.every([2, 4, 6], function (num) {
        return num % 2 == 0;
      });
      expect(result).to.equal(true);
    });

    it("should return false", function () {
      const result = _.every([2, 4, 6], function (num, index) {
        return num === index;
      });
      expect(result).to.equal(false);
    });

    it("should return false", function () {
      const result = _.every({
        a: 1,
        b: 2,
        c: 3
      }, function (value, key) {
        return key === 'a';
      });
      expect(result).to.equal(false);
    });

    it("should return true", function () {
      const result = _.every({
        a: 1,
        b: 1,
        c: 1
      }, function (value, key) {
        return value === 1;
      });
      expect(result).to.equal(true);
    });
  })

  describe('Some Test', function () {

    it('Should return True', function () {
      const result = _.some([null, 0, 'yes', false]);
      expect(result).to.equal(true);
    })

    it('Should return false', function () {
      const result = _.some([1, 2, 3, 4, 5], (value, index, list) => {
        return value > 5;
      })
      expect(result).to.equal(false);
    })

    it('Should return false', function () {
      const result = _.some([], (value) => {
        return value;
      })
      expect(result).to.equal(false);
    })

  })

  describe('Where Test', function() {

    it("Should return [{title: \'Cymbeline\', author: \'Shakespeare\', year: 1611}, \
    {title: \'The Tempest\', author: \'Shakespeare\', year: 1611}]", function() {
      const result = _.where([
        {title: "Cymbeline", author: "Shakespeare", year: 1611},
        {title: "The Tempest", author: "Shakespeare", year: 1611},
        {title: "The Xempest", author: "Shakespeares", year: 1611},
        {title: "The Sempest", author: "Shakespeares", year: 2611},
      ], {author: "Shakespeare", year: 1611});
      expect(result).to.eql([{title: "Cymbeline", author: "Shakespeare", year: 1611},
      {title: "The Tempest", author: "Shakespeare", year: 1611}]);
    })
  })

  describe('FindWhere Test', function() {

    it("Should return {a: 1, b: 2, c: 3}", function() {
      const result = _.findWhere([{a: 1, b: 2, c: 3},
                                  {x: 2, a: 1, y: 5},
                                  {a: 4, b: 3, g: 'z'}],
                                  {a: 1});
      expect(result).to.eql({a: 1, b: 2, c: 3});
    })

    it("Should return {a: 4, b: 3, g: 'z'}", function() {
      const result = _.findWhere([{a: 1, b: 2, c: 3},
                                  {x: 2, a: 1, y: 5},
                                  {a: 4, b: 3, g: 'z'}],
                                  {b: 3});
      expect(result).to.eql({a: 4, b: 3, g: 'z'});
    })

    it("Should return undefined", function() {
      const result = _.findWhere([{a: 1, b: 2, c: 3},
                                  {x: 2, a: 1, y: 5},
                                  {a: 4, b: 3, g: 'z'}],
                                  {g: 3});
      expect(result).to.eql(undefined);
    })
  })

  describe('Reject Test', function () {

    const list = [1, 2, 3, 4, 5];

    it('should return [4, 5]', function () {
      const list2 = _.reject(list, function (value) {
        return value < 4;
      })
      expect(list2).to.eql([4, 5]);
    });

    it('should return [1, 2, 3]', function () {
      const list2 = _.reject(list, function (value) {
        return value > 3;
      })
      expect(list2).to.eql([1, 2, 3]);
    });


    it('should return [1, 3, 5]', function () {
      const list2 = _.reject(list, function (value) {
        return value % 2 === 0;
      });
      expect(list2).to.eql([1, 3, 5]);
    });
  })

  describe("Contains Test", function() {

    it("Should return true", function() {
      const result = _.contains([1, 2, 3], 3, 'a');
      expect(result).to.equal(true);
    })

    it("Should return false", function() {
      const result = _.contains([1, 2, 3], 1, 1);
      expect(result).to.equal(false);
    })

    it("Should return false", function() {
      const result = _.contains([1, 2, 3], 2, 2);
      expect(result).to.equal(false);
    })

  })

  describe("Max Test", function() {

    it("Should return 3", function() {
      const result = _.max([1, 3, 0, 3, 2, -1])
      expect(result).to.equal(3);
    })

    it("Should return {name: 'curly', age: 60}", function() {
      const stooges = [{name: 'moe', age: 40},
                      {name: 'larry', age: 50},
                      {name: 'curly', age: 60}]
      const result = _.max(stooges, function(stooges) { return stooges.age});
      expect(result).to.eql({name: 'curly', age: 60});
    })
  })

  describe("Min Test", function() {

    it("Should return -1", function() {
      const result = _.min([1, 3, 0, 3, 2, -1])
      expect(result).to.equal(-1);
    })

    it("Should return {name: 'moe', age: 40}", function() {
      const stooges = [{name: 'moe', age: 40},
                      {name: 'larry', age: 50},
                      {name: 'curly', age: 60}]
      const result = _.min(stooges, function(stooges) { return stooges.age});
      expect(result).to.eql({name: 'moe', age: 40});
    })
  })

  describe("Size Test", function() {

    it("Should return 5", function() {
      const result = _.size([1, 2, 3, 4, 5]);
      expect(result).to.equal(5);
    })

    it("Should return 3", function() {
      const result = _.size({one: 1, two: 2, three: 3});
      expect(result).to.equal(3);
    })
  })

  describe("Shuffle Test", function() {

    it("Should return a list with all elements of 1, 2, 3, 4, 5, 6", function() {
      const result = _.shuffle([1, 2, 3, 4, 5, 6]);
      expect(result).to.include(1, 2, 3, 4, 5, 6);
    })

    it("Should return a list with the same length", function() {
      const result = _.shuffle([1, 2, 3, 4, 5, 6]);
      expect(result.length).to.equal(6);
    })

    it("Should be the same after sorted", function() {
      const result = _.shuffle([1, 2, 3, 4, 5, 6]);
      result.sort();
      expect(result).to.eql([1, 2, 3, 4, 5, 6].sort());
    })

  })

  describe("PickOne Test", function() {

    it("", function() {
      const result = _.pickOne([1, 2, 3, 4, 5, 6]);
      expect(result).to.be.oneOf([1, 2, 3, 4, 5, 6]);
    })

    it("", function() {
      const result = _.pickOne({a: 1, b: 2, c: 3});
      expect({a: 1, b: 2, c: 3}).to.deep.include(result);
    })

  })

  describe("Sample Test", function() {

    it("Should return an array when it is an array", function() {
      const result = _.sample([1, 2, 3, 4, 5, 6], 3);
      expect(Array.isArray(result)).to.equal(true);
    })

    it("Should return an object when it is an object", function() {
      const result = _.sample({a: 1, b: 2, c: 3}, 3);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
      function isObject(obj) {
        return obj === Object(obj);
      }
      expect(isObject(result) && !Array.isArray(result)).to.equal(true);
    })

    it("Should return an array of 3 elements from [1, 2, 3, 4, 5, 6]", function() {
      const result = _.sample([1, 2, 3, 4, 5], 3);
      expect([1, 2, 3, 4, 5, 6]).to.include.members(result);
    })

    it("Should return an {} of 2 elements from {a: 1, b: 2, c: 3}", function() {
      const result = _.sample({a: 1, b: 2, c: 3}, 2);
      expect({a: 1, b: 2, c: 3}).to.include(result);
    })

  })

  describe("GroupBy Test", function() {

    it("Should return {1: [1.3], 2: [2.1, 2.4]}", function() {
      var result = _.groupBy([1.3, 2.1, 2.4], function(num) {
        return Math.floor(num);
      });
      expect(result).to.eql({1: [1.3], 2: [2.1, 2.4]});
    })

    it(`Should return {3: ["one", "two"], 5: ["three"]}`, function() {
      var result = _.groupBy(['one', 'two', 'three'], 'length');
      expect(result).to.eql({3: ["one", "two"], 5: ["three"]});
    })
  })

  describe("IndexBy Test", function() {

    it(`Should return { 
                        "40": {name: 'moe', age: 40},
                        "50": {name: 'larry', age: 50},
                        "60": {name: 'curly', age: 60}
                      }`,
        function() {
          var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
          var result = _.indexBy(stooges, 'age');
          expect(result).to.eql({
                                  "40": {name: 'moe', age: 40},
                                  "50": {name: 'larry', age: 50},
                                  "60": {name: 'curly', age: 60}
                                })
    })

    it(`Should return { "curly": { "age": 60, "name": "curly" },
                        "larry": { "age": 50, "name": "larry" },
                        "moe": { "age": 40, "name": "moe" } }`, function() {
      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      var result = _.indexBy(stooges, (value, key, list) => {
        return "name";
      });
      expect(result).to.eql({
                              "curly": {
                                "age": 60,
                                "name": "curly"
                              },
                              "larry": {
                                "age": 50,
                                "name": "larry"
                              },
                              "moe": {
                                "age": 40,
                                "name": "moe"
                              }
                            });
    })
  })

  describe("CountBy Test", function() {

    it("Should count element by iteratee []", function() {
      var result = _.countBy([1, 2, 3, 4, 5], function(num) {
        return num % 2 === 0? 'even': 'odd';
      })
      expect(result).to.eql({odd: 3, even: 2});
    })

    it("Should count element by iteratee with {}", function() {
      var result = _.countBy({a: 1, b: 2, c: 1, d: 3, e: {f: 1}},
        function(value, key, list) {
          return typeof value === "object"? "other" : value > 1? "bigger": "smaller"; 
        })
      expect(result).to.eql({smaller: 2, bigger: 2, other: 1});
    })
  })

  describe("ToArray Test", function() {

    it("Should return [2, 3, 4]", function() {
      var result = (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
      expect(result).to.eql([2, 3, 4]);
    })

    it("Should return [1, 2, 3]", function() {
      var result = _.toArray({a: 1, b: 2, c: 3});
      expect(result).to.eql([1, 2, 3]);
    })
  })

  describe("Partition Test", function() {

    it("Should return [[1, 3, 5], [0, 2, 4]]", function() {
      var result = _.partition([0, 1, 2, 3, 4, 5], (value) => {
        if (value % 2 == 1) return true;
        else return false;
      })
      expect(result).to.eql([[1, 3, 5], [0, 2, 4]])
    })

    it("Should return [[1, 3, 5, 7]]", function() {
      var result = _.partition([1, 3, 5, 7], (value) => {
        if (value % 2 == 1) return true;
        else return false;
      })
      expect(result).to.eql([[1, 3, 5, 7], []])
    })
  })

});