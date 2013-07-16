bottle
======

Throttle functions based on how much cpu time they use.

###Usage

```javascript
	// where pct is a float representing the cpu ceiling. 
	// If you want fn to not use more than 10% of the cpu, then pct === .1	
	bottle(fn,pct); 
```

```html
	<script src='bottle.js'></script>
	<script>
		console.log(typeof expensiveProcess === 'function');
			--> true
		var bottledProcess = bottle(expensiveProcess,.01);
		doc.on('change',bottledProcess);
	</script>	
```
###Use case

Some processes follow this pattern:
- Initially very cpu-cheap
- May become expensive
- Not necessary to run all the time
- But ideally run as often as possible.

For example, a word processor might check what type of document you're working with. That might include parsing the entire document. Cheap at first, and also more likely to be useful (while you're still gathering clues). As the document gets larger it becomes a more expensive process but also less useful: the documents type is probably not going to change. This function is for that use case. 
