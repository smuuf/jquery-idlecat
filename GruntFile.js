module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    filename: 'jquery.idleCat',
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/**\n * <%= pkg.name %> by <%= pkg.author %>,\n * <%= pkg.giturl %>\n *\n * Built on <%= grunt.template.today("yyyy-mm-dd") %>.\n */\n',
        compress: false,
        screwIE8: true,
      },
      build: {
        src: 'src/<%= filename %>.js',
        dest: 'build/<%= filename %>.min.js',
      }
    },
    watch: {
      files: ['src/*', 'GruntFile.js'],
      tasks: ['uglify'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
