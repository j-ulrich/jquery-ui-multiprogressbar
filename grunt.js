/*global module:false require:true*/
module.exports = function(grunt) {
	"use strict";
	
	var fs = require('fs');
	
	var jshintrcs = {
		tests: JSON.parse(fs.readFileSync('tests/.jshintrc'))
	};

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.contributors[0].name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n'+
				' */'
		},
		lint: {
			src: 'src/*.js',
			grunt: 'grunt.js',
			tests: 'tests/test.js'
		},
		qunit: {
			files: ['tests/test.html']
		},
		concat: {
			css: {
				src: 'src/*.css',
				dest: 'dist/jquery.ui.multiprogressbar.<%= pkg.version %>.css'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:lint.src>'],
				dest: 'dist/jquery.ui.multiprogressbar.<%= pkg.version %>.min.js'
			}
		},
		watch: {
			files: ['<config:lint.src>', '<config:lint.tests>'],
			tasks: 'lint qunit'
		},
		jshint: {
			options: {
				camelcase: true,
				plusplus: true,
				forin: true,
				noarg: true,
				noempty: true,
				eqeqeq: true,
				bitwise: true,
				strict: true,
				undef: true,
				unused: true,
				curly: true,
				browser: true,
				devel: true,
				white: false,
				onevar: false,
				smarttabs: true
			},
			globals: {
				jQuery: true,
				$: true
			},
			tests: {options: jshintrcs.tests, globals: jshintrcs.tests.globals}
//			tests: {jshintrc: 'tests/.jshintrc'}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint qunit concat min');

};
