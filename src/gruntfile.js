module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-replace');
    grunt.initConfig({
        replace: {
            dist: {
                options: {
                    patterns: [
                    {
                        match: /var username =/,
                        replacement: 'var username = ' + grunt.option('username')
                    },
                    {
                        match: /var username=/,
                        replacement: 'var username = ' + grunt.option('username')
                    },
                    {
                        match: /var password =/,
                        replacement: 'var password = ' + grunt.option('password')
                    },
                    {
                        match: /var password=/,
                        replacement: 'var password = ' + grunt.option('password')
                    },
                    {
                        match: /var url =/,
                        replacement: 'var url = ' + grunt.option('url')
                    },
                    {
                        match: /var url=/,
                        replacement: 'var url = ' + grunt.option('url')
                    }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['./application/*.js'], dest: 'build/'}
                ]
            }
        }
    });

    grunt.registerTask('set-env', ['replace:dist:options:patterns:replacement:' + grunt.option('username') + ':' + grunt.option('password') + ':' + grunt.option('url')]);
};
