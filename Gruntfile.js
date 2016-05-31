// ��װ����
module.exports = function(grunt)
{
  // ��������
  grunt.initConfig(
  {

    // ��ȡ������Ϣ
    pkg: grunt.file.readJSON('package.json'),

    // �﷨������֤
    jshint:
    {
      options:
      {
        // �����Ű���
        curly: true,
        // ���ڼ����ͣ�ʹ��===��!==��������==��!=
        eqeqeq: false,
        // ��������ĸ��д�ĺ������������ࣩ��ǿ��ʹ��new
        newcap: false,
        // ����arguments.caller��arguments.callee
        noarg: false,
        // ��������ʹ��aaa.bbb������aaa['bbb']
        sub: false,
        // ��������δ�������
        undef: false,
        // ����������if(a = 0)�����Ĵ���
        boss: true,
        // ָ�����л���Ϊnode.js
        node: false
      },
      // files to lint
      all: ['src/resources/scripts/core/x.js']
    },

    // �ϲ��ļ�
    concat:
    {
      options:
      {
        separator: '' //separates scripts
      },
      dist:
      {
        files:
        {
          // ��������
          'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js': [
            'src/resources/scripts/native.js',
            'src/resources/scripts/sizzle.js',
            // 'src/resources/scripts/i18n/zh-cn/x-client-core.js', // ������֧��
            'src/resources/scripts/core/x.js', // ���Ĺ��߰�
            'src/resources/scripts/core/x.debug.js',
            'src/resources/scripts/core/x.encoding.js',
            'src/resources/scripts/core/x.cookies.js',
            'src/resources/scripts/core/x.css.js',
            'src/resources/scripts/core/x.date.js',
            'src/resources/scripts/core/x.expressions.js',
            'src/resources/scripts/core/x.dom.js',
            'src/resources/scripts/core/x.dom.data.js',
            'src/resources/scripts/core/x.dom.fn.js',
            // 'src/resources/scripts/dom/util/x.dom.util.select.js',
            'src/resources/scripts/core/x.net.js',
            'src/resources/scripts/core/x.page.js',
            'src/resources/scripts/core/x.util.js'
          ],
          // Template
          'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js': [
            'src/resources/scripts/template/x.template.js',
            'src/resources/scripts/template/x.template.xml.js',
            'src/resources/scripts/template/x.template.compile.js',
            'src/resources/scripts/template/x.template.syntax.js'
          ],
          // UI
          'dist/<%= pkg.version %>/<%= pkg.name %>-ui-core.zh-cn.js': [
            'src/resources/scripts/ui/core/x.ui.animation.js',
            'src/resources/scripts/ui/core/x.ui.drag.js',
            'src/resources/scripts/ui/core/x.ui.form.js',
            'src/resources/scripts/ui/core/x.ui.mask.js',
            'src/resources/scripts/ui/core/x.ui.tooltip.js',
            'src/resources/scripts/ui/core/x.ui.windows.js',
            'src/resources/scripts/ui/core/x.ui.wizards.js',
            'src/resources/scripts/ui/core/x.ui.dialogs.js',
            'src/resources/scripts/ui/core/x.ui.util.js'
          ],
          // Workflow
          'dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.js': [
            'src/resources/scripts/workflow/x.workflow.js',
            'src/resources/scripts/workflow/x.workflow.template.js',
            'src/resources/scripts/workflow/x.workflow.instance.js',
            'src/resources/scripts/workflow/x.workflow.node.js',
            'src/resources/scripts/workflow/x.workflow.historyNode.js',
            'src/resources/scripts/workflow/x.workflow.switcherExit.js'
          ]
        }
      }
    },

    // ����
    build:
    {
      'build-core':
      {
        // �������
        exports: 'x',
        dest: "dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js"
      },
      'build-template':
      {
        exports: 'template',
        browserExports: 'x.template',
        dest: "dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js"
      }
    },

    // ���������Ϣ
    cleanup:
    {
      'cleanup-core':
      {
        tags: ['#region', '#endregion', 'x.debug.log'],
        dest: "dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js"
      },
      'cleanup-template':
      {
        tags: ['#region', '#endregion', 'x.debug.log'],
        dest: "dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js"
      }
    },

    // ѹ���ļ�
    uglify:
    {
      options:
      {
        banner: '// -*- ecoding=utf-8 -*-\n// Name\t\t:<%= pkg.name %> \n// Version\t:<%= pkg.version %> \n// Author\t:<%= pkg.author %> \n// Date\t\t:<%= grunt.template.today("yyyy-mm-dd") %>\n'
      },
      'dist-core':
      {
        files:
        {
          'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js']
        }
      },
      'dist-template':
      {
        files:
        {
          'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js']
        }
      },
      'dist-ui-core':
      {
        files:
        {
          'dist/<%= pkg.version %>/<%= pkg.name %>-ui-core.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-ui-core.zh-cn.js']
        }
      },
      'dist-workflow':
      {
        files:
        {
          'dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.min.js': ['dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.js']
        }
      }
    },

    // ����
    copy:
    {
      // ԭ��(���� x.debug.log ���)
      original:
      {
        files: [
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-core.zh-cn.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-template.zh-cn.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-ui.zh-cn.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-workflow.zh-cn.js'
        }]
      },
      // ������
      dist:
      {
        files: [
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-core.zh-cn.min.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-core.zh-cn.min.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-template.zh-cn.min.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-template.zh-cn.min.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-ui.zh-cn.min.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-ui.zh-cn.min.js'
        },
        {
          src: 'dist/<%= pkg.version %>/<%= pkg.name %>-workflow.zh-cn.min.js',
          dest: 'src/resources/scripts/<%= pkg.name %>-workflow.zh-cn.min.js'
        }]
      }
    },

    // �����ĵ�
    jsdoc:
    {
      dist:
      {
        src: ['README.md', 'src/resources/scripts/core/*.js',
          'src/resources/scripts/ui/core/*.js',
          'src/resources/scripts/ui/pkg/x.ui.pkg.tabs.js',
          'src/resources/scripts/ui/pkg/x.ui.pkg.tree.js',
          'src/resources/scripts/ui/pkg/x.ui.pkg.slide.js',
          'src/resources/scripts/workflow/x.workflow.js'
        ],
        options:
        {
          // ����ļ���λ��
          destination: 'doc',
          // ģ��λ��
          template: 'build/jsdoc/templates/default/',
          // �Ƿ����ĵ������˽�г�Ա
          private: false
        }
      }
    },

    // ���������ļ��仯
    watch:
    {
      development:
      {
        files: [
          'src/resources/styles/default/*.less',
          'src/resources/styles/x-ui/*.less'
        ],
        tasks: ['less:development'],
        options:
        {
          event: ['changed']
        }
      },
      'x-ui':
      {
        files: [
          'src/resources/styles/x-ui/*.less'
        ],
        tasks: ['less:x-ui'],
        options:
        {
          event: ['changed']
        }
      }
    },

    less:
    {
      development:
      {
        files:
        {
          'src/resources/styles/default/login.css': 'src/resources/styles/default/login.less',
          'src/resources/styles/x-ui/x.ui.dialogs.less': 'src/resources/styles/x-ui/x.ui.dialogs.less'
        }
      }
    },

    // CSS ѹ��
    cssmin:
    {
      // WebSite 2.2.0 ��ʽ
      development:
      {
        files:
        {
          'src/resources/styles/x-ui/x-ui.min.css': [
            'src/resources/styles/x-ui/x.ui.accordion.css',
            'src/resources/styles/x-ui/x.ui.calendar.css',
            'src/resources/styles/x-ui/x.ui.dialogs.css'
          ]
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
    'uglify:dist-ui-core',
    'uglify:dist-workflow',
    'less',
    'cssmin',
    'jsdoc'
  ]);

  // ��������
  grunt.registerTask('development', [
    'concat:dist',
    'build',
    'copy:original',
    'cleanup',
    'uglify:dist-core',
    'uglify:dist-template',
    'uglify:dist-ui-core',
    'uglify:dist-workflow',
    'less',
    'cssmin',
    'copy:dist'
  ]);

  // �����ʽ��֤
  grunt.registerTask('lint', ['jshint']);

  // �����ĵ�
  grunt.registerTask('doc', ['jsdoc']);
};
