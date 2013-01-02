require('./bottle');
var bottleText = require('fs').readFileSync('./bottle.js', 'binary');
eval(bottleText);
describe('bottle', function() {
	it('exists', function() {
		expect(typeof bottle).toEqual('function');
	});	

	it('returns a function', function() {
		var fn = function() {
			return 'hello';
		};
		var bottledFunction = bottle(fn,1);
		expect(typeof bottle).toEqual('function')
	});
	it('runs a function once, definitely.', function() {
		var fn = function() {
			return 'hello';
		};
		var bottledFunction = bottle(fn,1);
		var res = bottledFunction();
		expect(res).toEqual('hello');
	});
	it('doesnt run really really slow functions too much', function() {
		var fn = function() {
			var ct = 0;
			while(ct++ < Math.pow(2,21)){
			}
			return 'hello';
		}
		var startTime = new Date().getTime();
		fn();
		var took = new Date().getTime() - startTime;
		var ct = 11;
		var performed = 0;
		bottledFn = bottle(fn,.75);
		while(ct--) {
			(function() {
				var count = parseInt(''+ ct);
				setTimeout(function() {
					var res = bottledFn();
					if(res ==='hello') {
						performed++;
					}
					if(count === 10) {
						asyncSpecDone();
					}
				},(took/2)*ct);
			})();
		}
		asyncSpecWait();
		expect(performed).toBeLessThan(11);
	});
});
