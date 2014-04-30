var Q = require('q');

module.exports.onAll = function(items, action){
	var promises = [];
	items.forEach(function(item){
		promises.push(action(item));
	});
	console.log("Waiting on " + promises.length + " promises.");
	return Q.all(promises);
}