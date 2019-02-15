const _ = require('../src/underscore');
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

});