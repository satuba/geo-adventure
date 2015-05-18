"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-simple-mocha");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ["*.js", "models/**/*.js", "routes/**/*.js", "test/**/*.js"]
      },
      options: {
        node: true,
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true
        }
      }
    },

    simplemocha: {
      dev: {
        src: ["test/**/*.js"]
      }
    },

    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
          event: ['changed']
        }
      },
      scripts: {
        files: ['*.js', 'models/**/*.js', 'test/**/*.js', 'routes/**/*.js', 'lib/**/*.js'],
        tasks: ['test', 'simplemocha:dev'],
        options: {
          event: ['added', 'deleted', 'changed']
        },
      },
    },

    jscs: {
      main: "server.js",
      controllers: {
        src: ["Gruntfile.js", "test/**/*.js"],
        options: {
          config: ".jscsrc"
        }
      }
    }
  });

  grunt.registerTask("test", ["jshint:dev", "jscs"]);
  grunt.registerTask("mocha", ["simplemocha:dev"]);
  grunt.registerTask("default", ["test", "mocha"]);
};