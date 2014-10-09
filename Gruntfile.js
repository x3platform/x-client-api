// 包装函数
module.exports = function(grunt)
{
    // 任务配置
    grunt.initConfig({

        // 获取配置信息
        pkg: grunt.file.readJSON('package.json'),

        // 语法规则验证
        jshint: {
            options: {
                // 大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: false,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: false,
                //禁用arguments.caller和arguments.callee
                noarg: false,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: false,
                //查找所有未定义变量
                undef: false,
                // 查找类似与if(a = 0)这样的代码
                boss: true,
                // 指定运行环境为node.js
                node: false
            },
            // files to lint
            all: ['src/resources/javascript/core/x.js']
        },

        // 合并文件
        concat: {
            options: {
                separator: '' //separates scripts
            },
            dist: {
                files: {
                    // 基本功能
                    'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js': [
                        'src/resources/javascript/native.js',
                        'src/resources/javascript/sizzle.js',
                        'src/resources/javascript/i18n/zh-cn/x-client-core.js', // 多语言支持
                        'src/resources/javascript/core/x.js',                   // 核心工具包
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

        // 编译
        build: {
            'build-core': {
                // 输出对象
                exports: 'x',
                dest: "dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js"
            },
            'build-template': {
                exports: 'template',
                browserExports: 'x.template',
                dest: "dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js"
            }
        },

        // 清理调试信息
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

        // 压缩文件
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

        // 复制
        copy: {
            // 原版(包括 x.debug.log 语句)
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
            // 发布版
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

        // 生成文档
        jsdoc: {
            dist: {
                src: ['README.md', 'src/resources/javascript/core/*.js',
                    'src/resources/javascript/ui/core/*.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.tabs.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.tree.js',
                    'src/resources/javascript/ui/pkg/x.ui.pkg.slide.js'],
                options: {
                    // 输出文件夹位置
                    destination: 'doc',
                    // 模板位置
                    template: 'build/jsdoc/templates/default/',
                    // 是否在文档中输出私有成员
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

    // 加载自定义任务
    grunt.loadTasks("build/tasks");

    // 任务加载
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    // grunt.loadNpmTasks('grunt-file-beautify');

    // 注意看，每一个任务列表格式是：“任务名：启用的任务配置”。通过这样的形式，我们可以指定MultiTasks运行时使用的配置，
    // 否则默认情况下，MultiTasks会依次使用每个配置去执行一遍任务。
    // grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);

    // 生产环境(默认)
    grunt.registerTask('default', [
        'concat:dist',
        'build',
        'cleanup',
        'uglify:dist-core',
        'uglify:dist-template',
        'uglify:dist-ui',
        'jsdoc']);

    // 开发环境
    grunt.registerTask('development', [
        'concat:dist',
        'build',
        'copy:original',
        'cleanup',
        'uglify:dist-core',
        'uglify:dist-template',
        'uglify:dist-ui',
        'copy:dist']);

    // 代码格式验证
    grunt.registerTask('lint', ['jshint']);

    // 生成文档
    grunt.registerTask('doc', ['jsdoc']);
};
