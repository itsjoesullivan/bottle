var bottle = function(fn,pct) {
	var lastTime = new Date().getTime(),
		startTime,
		res,
		whenLast,
		lastDuration = 0;
	return function() {
		startTime = new Date().getTime();
		if(!whenLast || lastDuration/pct < startTime - whenLast) {
			startTime = new Date().getTime();
			res = fn(); 
			whenLast = new Date().getTime();
			lastDuration = whenLast - startTime;
			return res;
		}       
	};
};   
