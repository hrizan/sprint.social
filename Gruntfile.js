module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                "src/js/*.js",
                "src/*.js"
            ]
        },
        shell: {
            prepare: {
                command: "cordova prepare"
            }
        },
        copy: {
            main: {
                src: ["**/*"],
                dest: "www/",
                expand: true,
                cwd: "src/"
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9006,
                    base: "src"
                }
            }
        },
        clean: {
            www: {
                src: ["www"]
            },
            js: {
                src: ["www/js/*.js", "!www/js/app.js"]
            },
            css: {
                src: [
                    "www/css/*.css",
                    "!www/css/app.css",
                    "!www/css/*screen.css"
                ]
            },
            stub: {
                src: ["www/cordova.js"]
            }
        },
        uglify: {
            app: {
                files: {
                    "www/js/app.js": ["www/js/*.js"]
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    "www/css/app.css": [
                        "www/css/*.css",
                        "!www/css/*screen.css"
                    ]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    "www/index.html": ["www/index.html"]
                },
                options: {
                    process: true
                }
            }
        },
        imageEmbed: {
            dist: {
                src: ["www/css/app.css"],
                dest: "www/css/app.css",
                options: {
                    maxImageSize: 0,
                    deleteAfterEncoding: true
                }
            }
        },
        watch: {
            scripts: {
                files: ["src/css/*.css", "src/js/*.js","src/lib/*.js", "src/*.js", "src/*.html"],
                tasks: ["build"],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-image-embed");

    grunt.registerTask("default", ["connect", "watch"]);
    grunt.registerTask("build", ["jshint", "clean:www", "copy", "clean:stub",
         "cssmin", "processhtml",  "clean:css", "imageEmbed", "shell"]);
};
