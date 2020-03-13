var should  = require('should')
var source  = 'okay.this.IS.a.string';
var target1 = 'okay this IS a string';
var target2 = 'okay thAK AK a string';



describe('str_replace', function() {
    describe('should', function() {
    	var str_replace;
    	it('load without errors', function() {
	        str_replace = require('../index.js');
        });

        str_replace = require('../index.js');

        it('replace . with space', function() {
            var result = str_replace('.', ' ', source);
            result.should.equal(target1);
        });

        it('replace "is" with "AK" ignoring case', function() {
            var result = str_replace('is', 'AK', target1, true);
            result.should.equal(target2);
        });

    });
});
