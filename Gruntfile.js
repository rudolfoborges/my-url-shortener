module.exports = function(grunt) {

  var gruntConfig = {
    appDIR: 'app',
    distDIR: 'dist'
  };

  grunt.initConfig({
    less: {
      development: {
        options: {
        },
        files: {
          'app/public/assets/css/style.css': ['app/less/*.less']
        }
      }
    },
    watch: {
      styles: {
        files: ['app/less/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: gruntConfig.appDIR,
          dest: gruntConfig.distDIR,
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'public/lib/**/*',
            '/public/assets/images/{,*/}*.{gif,webp}'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: gruntConfig.distDIR + '/public/assets/images',
          src: [
            'generated/*'
          ]
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['less', 'watch']);

  grunt.registerTask('build', ['copy:dist']);
};