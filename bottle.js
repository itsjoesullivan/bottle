/** Limits time spent processing a given function 
 * 
 * @param {Function} fn The subject function
 * @param {Number} pct The upper bound of CPU use allowed the function
 * @return {Function} The bottled function
 *
 * */
var bottle = function(fn,pct) {
	var lastTime = new Date().getTime(),
		startTime,
		bottledFn,
		whenLast,
		lastDuration = 0;
	return function() {
		startTime = new Date().getTime();
		if(!whenLast || lastDuration/pct < startTime - whenLast) {
			startTime = new Date().getTime();
			bottledFn = fn.apply(fn,arguments)
			whenLast = new Date().getTime();
			lastDuration = whenLast - startTime;
			return bottledFn;
		}       
	};
};   
