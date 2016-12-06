module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/main.min.js': '<%= pkg.main %>',
          'build/libs.min.js': '<%= pkg.libs %>'
        }
      }
    },

  });

  // 加载的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 执行的任务列表。
  grunt.registerTask('default', ['uglify']);

};