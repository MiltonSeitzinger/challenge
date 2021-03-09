module.exports = function(grunt) {
    grunt.initConfig({
      /* Configure uglify
      uglify: {
        build: {
        src: 'app.js',
        dest: 'app.min.js'  
        }
      },*/
			/* Configure  jshint */
			jshint: {
				files: ['tests/*.js','components/values/*.js', 'redis/*.js', 'config/*.js', 'sockets/*.js', 'app.js', 'routes.js'],
				options: {
					globals: {
						jQuery: true
					}
				}
			},
      // Configure a mochaTest task
      mochaTest : {
        test : {
          options : {
            //reporter : 'mocha-sonar-reporter', 
            reporter : 'spec',
            timeout : 5000,
            quiet : false 
          },
          src : ["tests/test.js"]
        }
      }
    });
		grunt.loadNpmTasks('grunt-contrib-jshint')
		grunt.loadNpmTasks('grunt-mocha-test')
    grunt.registerTask('automatic', ['mochaTest', 'jshint']);
};