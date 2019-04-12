module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        copy: {
            primary: {
                expand: true,
                cwd: 'dist/',
                src: '**', 
                dest: 'old_dist/'
            },
            secondary: {
                expand: true,
                cwd: 'server/',
                src: '**', 
                dest: 'dist/'
            }
        }
    });
    
    // Load the plugin that provides the "grunt-copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy:primary', 'copy:secondary']);

};