module.exports = function(grunt) {
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'watch']);
};