require('./bottle');
var bottleText = require('fs').readFileSync('./bottle.js', 'binary');

// node
if(typeof window === 'undefined') {
	expect = require('chai').expect;

}
eval(bottleText);
describe('bottle', function() {
	it('exists', function() {
		(typeof bottle).should.equal('function');
	});	

	it('returns a function', function() {
		var fn = function() {
			return 'hello';
		};
		var bottledFunction = bottle(fn,1);
		(typeof bottle).should.equal('function')
	});
	it('accepts arguments', function() {
		var fn = function(arg) {
			return arg;
		};
		var bottled = bottle(fn,1);
		bottled('asdf').should.equal('asdf');
	});
	it('retains a bound context', function() {
		var fn = function(arg) {
			return this;
		}.bind('asdf');
		bottle(fn,1)().should.equal('asdf');
	});
	it('runs a function once, definitely.', function() {
		var fn = function() {
			return 'hello';
		};
		var bottledFunction = bottle(fn,1);
		var res = bottledFunction();
		(res).should.equal('hello');
	});
	it('doesnt run really really slow functions too much', function(done) {
		// Define a heavy fn
		var fn = function() {
			var ct = 0;
			while(ct++ < Math.pow(2,18)){
			}
			return 'hello';
		}

		// Time it
		var startTime = new Date().getTime();
		fn();
		var took = new Date().getTime() - startTime;
		var performed = 0;
		bottledFn = bottle(fn,.75);

		
		var ct = 11;
		while(ct--) {
			(function() {
				// Cast inside closure
				var count = parseInt(''+ ct);
				setTimeout(function() {
					var res = bottledFn();
					if(res ==='hello') {
						performed++;
					}
					if(count === 10) {
						console.log(performed / 10);
						
						(performed).should.be.below(11);
						done();
					}
				},(took/1)*ct);
			})();
		}
	});
});
