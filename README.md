bottle
======

Throttle functions based on how much time they use.

###Use case

Some processes follow this pattern:
- Initially very cpu-cheap
- May become expensive
- Not necessary to run all the time
- But ideally run as often as possible.

For example, a word processor might check what type of document you're working with. That might include parsing the entire document. Cheap at first, and also more likely to be useful (while you're still gathering clues). As the document gets larger it becomes a more expensive process but also less useful: the documents type is probably not going to change. This function is for that use case. 
