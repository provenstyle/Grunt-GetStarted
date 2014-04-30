var shell = require('./shell');

var start = function(name){
	return shell.run('iisreset', ['/start']);
}

var stop = function(name){
	return shell.run('iisreset', ['/stop']);
}

module.exports.start = start;
module.exports.stop = stop;
