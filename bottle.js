/** Limits time spent processing a given function 
 * 
 * @param {Function} fn The subject function
 * @param {Number} pct The upper bound of CPU use allowed the function
 * @return {Function} The bottled function
 *
 * */
var bottle = function(fn,pct) {
	var startTime,
		bottledFn,
		whenLastRun,
		lastDuration = 0;
	return function() {
		startTime = new Date().getTime();
		if((!whenLastRun || lastDuration/pct < startTime - whenLastRun)) {
			bottledFn = fn.apply(fn,arguments)
			whenLastRun = new Date().getTime();
			lastDuration = whenLastRun - startTime;
			return bottledFn;
		}       
	};
};   
