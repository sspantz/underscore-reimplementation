const _ = require('../src/underscore')
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Collections', function() {

  describe('Availability Test', function() {

    it('should be OK!', function() {
      expect(true).to.be.equal(true);
    });

  });

  describe('Each Test', function() {

    const list = [1, 2, 3];

    it('should return 6', function() {
      let   sum  = 0;
      _.each(list, (value, key, list) => {
        sum += value;
      });
      expect(sum).to.equal(6);
    });

    it('should return [1, 2, 3]', function() {
      const list2 = [];
      _.each(list, (value, key, list) => {
        list2.push(value);
      });
      expect(list2).to.be.an('array').that.includes(1, 2, 3);
    });
  });

  describe('Map Test', function() {

    const list = [1, 2, 3];
    const dic = {one: 1, two: 2, three: 3};

    it('should return [3, 6, 9] from [1, 2, 3]', function() {
      const list2  = _.map(list, function(num) { return num * 3; });
      const length = list2.length;
      expect(length).to.be.equal(3);
      expect(list2).to.be.an('array').that.includes(3, 6, 9);
    });

    it('should return [3, 6, 9] from {one: 1, two: 2, three: 3}', function() {
      const list2 = _.map(dic, (item, key, list) => {
        return item * 3;
      });
      expect(list2.length).to.equal(3);
      expect(list2).to.be.an('array').that.includes(3, 6, 9);
    })
  });

  describe('Filter Test', function() {

    const list = [1, 2, 3, 4, 5];

    it('should return [1, 2, 3]', function() {
      const list2 = _.filter(list, function(value) {
        return value < 4;
      })
      expect(list2.length).to.equal(3);
      expect(list2).to.be.an('array').that.includes(1, 2, 3);
    });

    it('should return [4, 5]', function() {
      const list2 = _.filter(list, function(value) {
        return value > 3; 
      })
    });
  

    it('should return [2, 4]', function() {
      const list2 = _.filter(list, function(value) {
        return value % 2 === 0;
      });
      expect(list2.length).to.equal(2);
      expect(list2).to.be.an('array').that.includes(2, 4);
    });
  })

  describe('Reduce Test', function() {

    const list = [1, 2, 3, 4, 5];
    const obj = {'a': 1, 'b': 2, 'c': 1, 'd':2, 'e': 3};

    it("should return 15", function() {
      const sum = _.reduce(list, (memo, value, key) => {
        return memo + value;
      })
      expect(sum).to.equal(15);
    })

    it("should return {1: [a, c], 2: [b, d], 3: [e]}", function() {
      const result = _.reduce(obj, (memo, value, key) => {
        (memo[value] || (memo[value] = [])).push(key);
        return memo;
      }, {})
      expect(result).to.be.an('object');
      expect(result[1]).includes('a', 'c');
      expect(result[2]).includes('b', 'd');
      expect(result[3]).includes('e');
    })

  })

});
