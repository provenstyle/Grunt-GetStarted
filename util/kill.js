var shell = require('./shell');

module.exports.now = function (name) {
	return shell.run('taskkill', ['/F', '/IM', name]);
};