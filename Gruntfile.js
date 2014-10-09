// ��װ����
module.exports = function(grunt)
{
    // ��������
    grunt.initConfig({

        // ��ȡ������Ϣ
        pkg: grunt.file.readJSON('package.json'),

        // �﷨������֤
        jshint: {
            options: {
                // �����Ű���
                curly: true,
                //���ڼ����ͣ�ʹ��===��!==��������==��!=
                eqeqeq: false,
                //��������ĸ��д�ĺ������������ࣩ��ǿ��ʹ��new
                newcap: false,
                //����arguments.caller��arguments.callee
                noarg: false,
                //��������ʹ��aaa.bbb������aaa['bbb']
                sub: false,
                //��������δ�������
                undef: false,
                // ����������if(a = 0)�����Ĵ���
                boss: true,
                // ָ�����л���Ϊnode.js
                node: false
            },
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
                        'src/resources/javascript/core/x.dom.data.js',
                        'src/resources/javascript/core/x.dom.fn.js',
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
                        'src/resources/javascript/ui/core/x.ui.form.js',
                        'src/resources/javascript/ui/core/x.ui.mask.js',
                        'src/resources/javascript/ui/core/x.ui.tooltip.js',
                        'src/resources/javascript/ui/core/x.ui.windows.js',
                        'src/resources/javascript/ui/core/x.ui.wizards.js',
                        'src/resources/javascript/ui/core/x.ui.dialogs.js',
                        'src/resources/javascript/ui/core/x.ui.util.js'
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

        // ���������Ϣ
        cleanup: {
            'cleanup-core': {
                tags: ['#region', '#endregion', 'x.debug.log'],
                dest: "dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js"
            },
            'cleanup-template': {
                tags: ['#region', '#endregion', 'x.debug.log'],
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
            // ԭ��(���� x.debug.log ���)
            original: {
                files: [
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-core.zh-cn.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-template.zh-cn.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-ui.zh-cn.js'
                }]
            },
            // ������
            dist: {
                files: [
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.min.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-core.zh-cn.min.js'
                },
                {
                    src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.min.js',
                    dest: 'src/resources/javascript/<%= pkg.name %>-template.zh-cn.min.js'
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
                src: ['README.md', 'src/resources/javascript/core/*.js',
                    'src/resources/javascript/ui/core/*.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.tabs.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.tree.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.slide.js'],
                options: {
                    // ����ļ���λ��
                    destination: 'doc',
                    // ģ��λ��
                    template: 'build/jsdoc/templates/default/',
                    // �Ƿ����ĵ������˽�г�Ա
                    private: false
                }
            }
        },

        less: {
            development: {
                files: {
                    'src/resources/styles/default/login.css': 'src/resources/styles/default/login.less'
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    // grunt.loadNpmTasks('grunt-file-beautify');

    // ע�⿴��ÿһ�������б��ʽ�ǣ��������������õ��������á���ͨ����������ʽ�����ǿ���ָ��MultiTasks����ʱʹ�õ����ã�
    // ����Ĭ������£�MultiTasks������ʹ��ÿ������ȥִ��һ������
    // grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);

    // ��������(Ĭ��)
    grunt.registerTask('default', [
        'concat:dist',
        'build',
        'cleanup',
        'uglify:dist-core',
        'uglify:dist-template',
        'uglify:dist-ui',
        'jsdoc']);

    // ��������
    grunt.registerTask('development', [
        'concat:dist',
        'build',
        'copy:original',
        'cleanup',
        'uglify:dist-core',
        'uglify:dist-template',
        'uglify:dist-ui',
        'copy:dist']);

    // �����ʽ��֤
    grunt.registerTask('lint', ['jshint']);

    // �����ĵ�
    grunt.registerTask('doc', ['jsdoc']);
};
