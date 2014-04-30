module.exports = function(grunt){

	var shell = require('./util/shell');
	var msbuild = require('./util/msbuild');
	var service = require('./util/windowsService');
	var kill = require('./util/kill');
	var wait = require('./util/wait');
	var service = require('./util/windowsService');

	grunt.initConfig({
		watch:{
			dlls:{
				files:['C:/Watchguard/vermillion/vermillion/ELX/bin/Debug/**'],
				tasks:['shell:runTests'],
				options:{
					livereload: 37000
				}
			}
		},
		clean:{
			logs:{
				src: ['c:/WatchGuardVideo/logs']
			}
		}
	});

	servicesToStop = [
		'WatchGuard LVS Service',
		'WatchGuardImportService',
		'WatchGuardHostedService',
		'WatchGuardTokenService',
		'ADAM_WatchGuardLDS'
	],
	tasksToKill = [
		'WGEvidLibrary.exe',
		'WGEvidLibrary.vshost.exe',
		'Services.Host.PublishingService.exe',
		'Services.Host.PublishingService.vshost.exe',
		'Services.Host.Transcoding.exe',
		'Services.Host.Transcoding.vshost.exe',
		'wgImportScanner.exe',
		'wgImportScanner.vshost.exe',
		'Services.Host.LVS.exe',
		'Services.Host.LVS.vshost.exe',
		'Services.Host.WinService.exe',
		'Services.Host.WinService.vshost.exe',
		'WatchGuard.Elx.exe',
		'WatchGuard.Elx.vshost.exe'
	];

	grunt.registerTask('default', ['runTests']);

	grunt.registerTask('watch', ['']);

	grunt.registerTask('startElx', '', function(){
		var done = this.async();
		shell.run('../vermillion/ELX/bin/Debug/WatchGuard.Elx.exe', [])
			.done(done);
	});

	grunt.registerTask('build', 'Run msbuild script', function(){
		var done = this.async();
		msbuild.build('../vermillion/EvidenceLibraryExpress.msbuild', ['test'])
			.done(done);

	});

	grunt.registerTask('runTests', 'Run mspec tests', function(){
		var done = this.async();
		var mspecPath = "../vermillion/packages/machine.specifications.0.7.0/tools/mspec-x86-clr4.exe"
		var tests = [
			'../vermillion/Export/WatchGuard.Export.Tests/bin/Debug/WatchGuard.Export.Tests.dll',
			'../vermillion/Export.Application.Tests/bin/Debug/WatchGuard.Elx.Export.Application.Tests.dll',
			'../vermillion/RecordedEventsExportModule.Tests/bin/Debug/WatchGuard.Elx.RecordedEventsExportModule.Tests.dll',
			'../vermillion/Elx.Database.Tests/bin/Debug/Elx.DatabaseTests.dll',
			'../vermillion/ELX.Tests/bin/Debug/ELX.Tests.dll'
		];

		shell.run(mspecPath, tests)
			.done(done);
	});

	grunt.registerTask('deleteLogs', ['stopServices', 'kill', '_deleteLogs']);

	grunt.registerTask('_deleteLogs', 'Delete log files', function(){
		grunt.log.writeln('Deleting log files');
		grunt.file.delete('c:/WatchGuardVideo/logs', {force: true});
	});

	grunt.registerTask('kill', 'Kill watchguard processes', function(){
		var done = this.async();
		wait.onAll(tasksToKill, kill.now)
			.done(done);
	});

	grunt.registerTask('stopServices', 'stop watchguard services', function(){
		var done = this.async();
		wait.onAll(servicesToStop, service.stop)
			.done(done);
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
};
 