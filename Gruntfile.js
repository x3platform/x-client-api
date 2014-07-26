// ��װ����
module.exports = function(grunt)
{
    // ��������
    grunt.initConfig({
        // ��ȡ������Ϣ
        pkg: grunt.file.readJSON('package.json'),
        // �﷨������֤
        jshint: {
            // files to lint
            all: ['src/resources/javascript/core/x.js']
        },

        // �ϲ��ļ�
        concat: {
            options: {
                separator: '' //separates scripts
            },
            dist: {
                files: {
                    // ��������
                    'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js': [
                        'src/resources/javascript/native.js',
                        'src/resources/javascript/sizzle.js',
                        'src/resources/javascript/i18n/zh-cn/x-client-core.js', // ������֧��
                        'src/resources/javascript/core/x.js',                   // ���Ĺ��߰�
                        'src/resources/javascript/core/x.debug.js',
                        'src/resources/javascript/core/x.encoding.js',
                        'src/resources/javascript/core/x.cookies.js',
                        'src/resources/javascript/core/x.css.js',
                        'src/resources/javascript/core/x.date.js',
                        'src/resources/javascript/core/x.expressions.js',
                        'src/resources/javascript/core/x.dom.js',
                        'src/resources/javascript/core/x.net.js',
                        'src/resources/javascript/core/x.page.js',
                        'src/resources/javascript/core/x.util.js'
                    ],
                    // Template
                    'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js': [
                        'src/resources/javascript/template/x.template.js',
                        'src/resources/javascript/template/x.template.xml.js',
                        'src/resources/javascript/template/x.template.compile.js',
                        'src/resources/javascript/template/x.template.syntax.js'
                    ],
                    // UI
                    'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.js': [
                        'src/resources/javascript/ui/core/x.ui.animation.js',
                        'src/resources/javascript/ui/core/x.ui.drag.js',
                        'src/resources/javascript/ui/core/x.ui.mask.js',
                        'src/resources/javascript/ui/core/x.ui.windows.js'
                    ]
                }
            }
        },

        // ����
        build: {
            'build-core': {
                // �������
                exports: 'x',
                dest: "dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js"
            },
            'build-template': {
                exports: 'template',
                browserExports: 'x.template',
                dest: "dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js"
            }
        },

        // ѹ���ļ�
        uglify: {
            options: {
                banner: '// -*- ecoding=utf-8 -*-\n// Name\t\t:<%= pkg.name %> \n// Version\t:<%= pkg.version %> \n// Author\t:<%= pkg.author %> \n// Date\t\t:<%= grunt.template.today("yyyy-mm-dd") %>\n'
            },
            'dist-core': {
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js']
                }
            },
            'dist-template': {
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js']
                }
            },
            'dist-ui': {
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.js']
                }
            },
            'dist-workflow': {
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.js']
                }
            }
        },

        // ����
        copy: {
            dist: {
                files: [
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-core.zh-cn.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.min.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-core.zh-cn.min.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-template.zh-cn.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.min.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-template.zh-cn.min.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-ui.zh-cn.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.min.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-ui.zh-cn.min.js'
                }]
            }
        },

        // �����ĵ�
        jsdoc: {
            dist: {
                src: ['src/*.js', 'test/*.js'],
                options: {
                    destination: 'doc'
                }
            },

            dev: {
                src: ['src/*.js', 'test/*.js'],
                options: {
                    //
                    private: false,
                    destination: 'dev_release/doc/',
                    tutorials: 'dev_release/demo'
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    // �����Զ�������
    grunt.loadTasks("build/tasks");

    // �������
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    // grunt.loadNpmTasks('grunt-file-beautify');


    // �Զ�������
    grunt.registerTask('test1', ['jshint']);

    // ע�⿴��ÿһ��taskList��ʽ�������ģ��������������õ��������á���ͨ����������ʽ�����ǿ���ָ��MultiTasks����ʱʹ�õ����ã�
    // ����Ĭ������£�MultiTasks������ʹ��ÿ������ȥִ��һ������
    grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);

    // Ĭ������
    grunt.registerTask('default', ['concat:dist', 'build', 'uglify:dist-core', 'uglify:dist-template', 'uglify:dist-ui', 'copy:dist']);
    // grunt.registerTask('default', ['concat:dist', 'uglify', 'build']);
};
