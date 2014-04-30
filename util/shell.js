var spawn = require('child_process').spawn;
var Q = require('q');

function run(cmd, args) {
    var def = Q.defer();

    console.log('Running: ' + fullCommand());
	var child = spawn(cmd, args, {stdio : 'inherit'}); //{stdio : 'inherit'} preserves color in the console

    child.on('close', function(code){
    	console.log('command: ' + fullCommand() + ' exited with code: ' + code);
        def.resolve();
    });

    child.on('error', function(code){
        console.log('error: ' + fullCommand() + 'errored with code: ' + code);
        def.reject("An error occured while executing the command.");
    })

    function fullCommand(){
		var temp = cmd;
		for(var i = 0; i < args.length; i++){
	    	temp += " " + args[i];
		}
		return '[ ' + temp + ' ]';
	}

    return def.promise;
}

module.exports.run = run;