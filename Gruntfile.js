module.exports = function(grunt) {
    grunt.initConfig({
			/* Configure  jshint para comprobar la sintaxis de los archivos */
			jshint: {
				files: ['tests/*.js','components/values/*.js', 'redis/*.js', 'config/*.js', 'sockets/*.js', 'app.js', 'routes.js'],
				options: {
					globals: {
						jQuery: true
					}
				}
			},
      // Configure a mocha-test para realizar el test correspondiente
      mochaTest : {
        test : {
          options : {
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