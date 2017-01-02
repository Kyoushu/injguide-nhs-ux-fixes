module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                includePaths: [
                ]
            },
            dist: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'src/scss/app.scss'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['sass', 'javascript']
            },

            sass: {
                files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
                tasks: ['sass']
            },

            scripts: {
                files: ['src/js/*.js'],
                tasks: ['javascript']
            }
        },

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'src/js/app.js',
                    'src/js/*.js',
                    'src/js/**/*.js'
                ],
                dest: 'dist/js/app.js',
                nonull: true
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/app.min.css': 'dist/css/app.css'
                }
            }
        },

        uglify: {
            build: {
                src: 'dist/js/app.js',
                dest: 'dist/js/app.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('javascript', ['concat','uglify']);
    grunt.registerTask('stylesheet', ['sass', 'cssmin']);
    grunt.registerTask('build', ['stylesheet', 'javascript']);
    grunt.registerTask('default', ['build','watch']);

};