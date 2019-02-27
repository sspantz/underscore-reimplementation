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
      const list2 = _.filter(list, function (value) {
        return value > 3;
      })
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

    it("Should return {}", function() {
      const result = _.findWhere([{a: 1, b: 2, c: 3},
                                  {x: 2, a: 1, y: 5},
                                  {a: 4, b: 3, g: 'z'}],
                                  {g: 3});
      expect(result).to.eql({});
    })
  })


});