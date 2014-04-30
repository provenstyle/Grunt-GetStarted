var shell = require('./shell');

var msbuildPath = 'C:/Windows/Microsoft.NET/Framework/v4.0.30319/msbuild.exe';

module.exports = {
	build: function(buildFile, tasks){
		tasks = tasks ? tasks : [];

		var args = [];
		args.push(buildFile);
		tasks.forEach(function(t){
			args.push('/target:' + t);
		});
		return shell.run(msbuildPath, args);
	}
};