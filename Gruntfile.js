/* global module:true */
module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    dirs: {
      js: 'assets/js',
      css: 'assets/css',
      img: 'assets/img',
      sass: 'assets/sass',
      vendor: 'assets/js/vendor'
    },

    pkg: grunt.file.readJSON( 'package.json' ),

    concat: {
      dist: {
        src: [
          'src/<%= dirs.vendor %>/angular/angular.js',
          'src/<%= dirs.vendor %>/angular-route/angular-route.js',
          'src/<%= dirs.vendor %>/jquery.customSelect/jquery.customSelect.js',
          'src/<%= dirs.js %>/plugins.js',
          'src/<%= dirs.js %>/main.js',
          'src/<%= dirs.js %>/controllers/**/*'
        ],
        dest: 'src/<%= dirs.js %>/scripts.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'src/<%= dirs.js %>/scripts.min.js': ['src/<%= dirs.js %>/scripts.js']
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'src/<%= dirs.sass %>',
          cssDir: 'src/<%= dirs.css %>',
          imagesDir: 'src/<%= dirs.img %>',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      }
    },

    csscomb: {
      dev: {
        files: {
          'src/<%= dirs.css %>/main.css': ['src/<%= dirs.css %>/main.css'],
          'src/<%= dirs.css %>/main-ie.css': ['src/<%= dirs.css %>/main-ie.css']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: 'src/assets/sass/**/*',
        tasks: [
          'compass',
          'csscomb'
        ]
      },
      js: {
        files: [
          'src/<%= dirs.js %>/**/*',
          '!src/<%= dirs.js %>/scripts.js',
          '!src/<%= dirs.js %>/scripts.min.js'
        ],
        tasks: [
          'concat',
          'jshint',
          'uglify'
        ]
      },
      html: {
        files: [
          'src/*.html',
          'src/*/*.html'
        ]
      }
    },

    jshint: {
      options: {
        'bitwise': true,
        'eqeqeq': true,
        'eqnull': true,
        'immed': true,
        'newcap': true,
        'esnext': true,
        'latedef': true,
        'noarg': true,
        'node': true,
        'undef': true,
        'browser': true,
        'trailing': true,
        'jquery': true,
        'curly': true,
        globals: {
          jQuery: true,
          console: true,
          alert: true,
          angular: true
        }
      },
      beforeconcat: [
        'src/<%= dirs.js %>/plugins.js',
        'src/<%= dirs.js %>/main.js',
      ]
    },

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: true,
          base: 'src'
        }
      }
    }

  });

  grunt.registerTask('default', ['connect', 'watch']);

};