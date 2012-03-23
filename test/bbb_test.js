var grunt = require('grunt');

exports['bbb'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'helper': function(test) {
    test.expect(1);
    // tests here
    test.equal(grunt.helper('bbb'), 'bbb!!!', 'should return the correct value.');
    test.done();
  }
};
