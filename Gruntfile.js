'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ['<%= config.app %>/coffee/{,*/}*.coffee'],
        tasks: ['coffee'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint', 'requirejs'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        'test/{,*/}*.js'
      ]
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            '<%= config.app %>/scripts/*'
          ]
        }]
      },
      requirejs: {
        dot: true,
        src: [
          '<%= config.dist %>/**/*.js',
          '!<%= config.dist %>/scripts/main.js'
        ]
      },
      server: '.tmp'
    },

    bower: {
      dev: {
        dest: '<%= config.dist %>/bower_components',
        options: {
          expand: true
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            '../bower_components/{,*/}*.*'
          ]
        }]
      },
      styles: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/styles',
          dest: '<%= config.dist %>/styles',
          src: '{,*/}*.css'
        }]
      },
      compiled: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/scripts',
          dest: '<%= config.dist %>/scripts',
          src: '{,*/}*.js',
          filter: function (file) {
            return !file.endsWith('main.js');
          }
        }]
      }
    },

    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: /ractive/
      }
    },

    requirejs: {
      compile: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['<%= config.dist %>/index.html'],
            module: 'main'
          }],
          modules: [{name: 'main'}],
          mainConfigFile: '<%= config.app %>/scripts/main.js',
          dir: '<%= config.dist %>/scripts',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          useStrict: true,
          logLevel: 2
        }
      }
    },

    coffee: {
      compile: {
        expand: true,
        cwd: '<%= config.app %>/coffee',
        src: ['{,*/}*.coffee'],
        dest: '<%= config.app %>/scripts',
        ext: '.js'
        //options: {
        //  bare: true
        //}
      }
    }

  });

  /**
      Register task
  */

  grunt.registerTask('serve',
      'start the server and preview your app, --allow-remote for remote access',
      function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'build',
      'wiredep',
      'connect',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. ' +
        'Use `grunt serve` to start a server. Target: ' + target
    );
    // grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server'
      ]);
    }

    grunt.task.run([
      // 'connect:test'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'copy:dist',
    'copy:styles',
    'coffee',
    'requirejs',
    'bower'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};