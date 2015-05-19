'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', './models/**/*.js', './routes/**/*.js', './lib/**/*.js', './test/**/*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      dev: {
        src: ['<%= jshint.dev.src %>']
      }
    },
    simplemocha: {
      dev: {
        src: ['./test/**/*.js']
      }
    },
    watch: {
      app: {
        files: ['<%= jshint.dev.src %>'],
        tasks: ['jshint', 'jscs', 'simplemocha']
      }
    }
  });//end grunt config

  grunt.registerTask('test', ['jshint:dev', 'jscs:dev']);
  grunt.registerTask('mocha', ['simplemocha:dev']);
  grunt.registerTask('default', ['test', 'mocha', 'watch']);
};