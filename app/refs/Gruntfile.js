module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadTasks('./dev/tasks');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-istanbul');

  function getCompassOptions(sassDir){
    var cdnPath = '/webapp/';
    if(grunt.option('target.env') === 'prod'){
      cdnPath = 'https://s1.nurtinc.com/webapp/';
    }


    var options = {
      httpPath: '/webapp/',
      imagesPath: './app/style/shared/images',
      generatedImagesDir: 'app/components/static/images',
      outputStyle: 'expanded',
      relativeAssets: false,
      httpGeneratedImagesPath: cdnPath + 'images/',
      cssDir: '<%=properties.tmpDir %>/',
      noLineComments: true,
      httpImagesPath: cdnPath,
      httpFontsPath: '/webapp/',
      sassDir: sassDir,
    };
    
    return options;    
  }

  function getEnvName() {
    if (grunt.option('target.env') === 'prod') {
      return 'production';
    }

    return 'development';
  }

  var config = {
    meta: {
      banner: '/*! Webapp 1.2 - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> nurt */'
    },

    properties: {
      nurtDir: '../nurt',
      reportsDir: './reports',
      srcDir: './app/src',
      styleDir: './app/style',
      testDir: './app/test',
      componentDir: './app/components',
      templateDir: './app/template',
      tmpDir: './tmp',
      tmptmpDir: './tmp/tmp',
      devServerDir: './devServer',
      distDir: './dist',
      dataDir:'./app/data',
      nodeModulesDir: './node_modules'
    },

    clean: {
      tmp: ['<%= properties.tmpDir %>'],
      tmptmp: ['<%= properties.tmptmpDir %>'],
      dev: ['<%= properties.devServerDir %>'],
      dist: ['<%= properties.distDir %>'],
      reports: ['<%= properties.reportsDir %>'],
      conf: ['<%= properties.srcDir %>/nurt/conf.js']
    },

    copy:{
      valueObjects: {
        files: [{
          dest: "<%= properties.srcDir %>/nurt/valueObjects/",
          cwd: "<%= properties.nurtDir %>/build/jsvo/",
          src: "**",
          expand: true
        }]
      },
      devTemplates:{
        files: [
          {
            dest: '<%= properties.devServerDir %>/template/',
            cwd: '<%= properties.templateDir %>/',
            src: '**',
            expand: true
          }
        ]
      },
      devImages: {
          files: [{
              dest: '<%= properties.devServerDir %>/images',
              cwd: '<%= properties.componentDir %>/static/images',
              src: '**',
              expand: true
          }]

      },
      devComponents:{
        files: [
          {
            dest: '<%= properties.devServerDir %>/static',
            cwd: '<%= properties.componentDir %>/static',
            src: ['tz/**', 'flowplayer/**', 'fonts/**', 'images/**', 'mraid/**'],
            expand: true
          },
          {
            dest: '<%= properties.devServerDir %>/',
            cwd: '<%= properties.componentDir %>/static/mraid',
            expand: true,
            src: 'mraid.js'
          },
          {
            cwd: '<%= properties.componentDir %>/nurt-icon-font/dist',
            dest: '<%= properties.devServerDir %>/static/nurt-icon-font',
            src: 'nurt-icon-font.*',
            expand: true
          }
        ]
      },
      devData: {
          files: [
            {
              dest: '<%= properties.devServerDir %>/data',
              cwd: '<%= properties.dataDir %>',
              src: '**',
              expand: true

            }
          ]
        },
      devStyles: {
        files: [
          {
            dest: '<%= properties.devServerDir %>',
            cwd: '<%= properties.tmpDir %>',
            expand: true,
            src: ['*.css', 'images/**']
          }
        ]
      },


      devScripts: {
        files: [
          {
            dest: '<%= properties.devServerDir %>',
            cwd: '<%= properties.tmpDir %>',
            expand: true,
            src: ['*.js', 'i18n/**']
          }
        ]
      },
      dist:{
        files: [
          {
            dest: '<%= properties.distDir %>/template/',
            cwd: '<%= properties.templateDir %>/',
            src: '**',
            expand: true
          },
          {
            dest: '<%= properties.distDir %>',
            cwd: '<%= properties.tmpDir %>',
            expand: true,
            src: ['images/**', 'i18n/**']
          },
          {
            dest: '<%= properties.distDir %>/static',
            cwd: '<%= properties.componentDir %>/static',
            expand: true,
            src: ['tz/**', 'flowplayer/**', 'images/**', 'fonts/**', 'mraid/**']
          },
          {
            dest: '<%= properties.distDir %>/images',
            cwd: '<%= properties.componentDir %>/static/images',
            src: '**',
            expand: true
          },
          {
            dest: '<%= properties.distDir %>/data',
            cwd: '<%= properties.dataDir %>',
            src: '**',
            expand: true
          },
          {
            dest: '<%= properties.distDir %>/',
            cwd: '<%= properties.componentDir %>/static/mraid',
            expand: true,
            src: 'mraid.js'
          },
          {
            cwd: '<%= properties.componentDir %>/nurt-icon-font/dist',
            dest: '<%= properties.distDir %>/static/nurt-icon-font',
            src: 'nurt-icon-font.*',
            expand: true
          }
        ]
      }
   },

    globMin: {
      i18n: "<%= properties.tmpDir %>/i18n/*.js"
    },

    browserify: {
      audienceSuite: {
        files: {
          '<%= properties.tmpDir %>/audienceSuite.js': ['<%= properties.srcDir %>/audienceSuite/*']
        }
      },
      campaignSuite: {
        files: {
          '<%= properties.tmpDir %>/campaignSuite.js': ['<%= properties.srcDir %>/campaignSuite/*']
        }
      },
      insightsReport: {
        files: {
          '<%= properties.tmpDir %>/insightsReport.js': ['<%= properties.srcDir %>/insightsReport/*']
        }
      },
      test: {
        files: {
          '<%= properties.tmpDir %>/test.js': ['<%= properties.srcDir %>/test/module.js']
        }
      },
      nurt: {
        files: {
          '<%= properties.tmpDir %>/nurt.js': ['<%= properties.srcDir %>/nurt/**']
        }
      },
      reportCenterJsToTmpTmp: {
        files: {
          '<%= properties.tmptmpDir %>/reportCenter.js': ['<%= properties.srcDir %>/reportCenter/*']
        }
      },
      instrumented: {
        files: {
          '<%= properties.tmpDir %>/audienceSuite-instrumented.js': ['<%= properties.tmpDir %>/instrumented-src/<%= properties.srcDir %>/audienceSuite/*'],
          '<%= properties.tmpDir %>/campaignSuite-instrumented.js': ['<%= properties.tmpDir %>/instrumented-src/<%= properties.srcDir %>/campaignSuite/*'],
          '<%= properties.tmpDir %>/insightsReport-instrumented.js': ['<%= properties.tmpDir %>/instrumented-src/<%= properties.srcDir %>/insightsReport/*'],
          // After bundling, report center still has more tasks dependent upon this path that need to be run.
          '<%= properties.tmptmpDir %>/reportCenter.js': ['<%= properties.tmpDir %>/instrumented-src/<%= properties.srcDir %>/reportCenter/*'],
          '<%= properties.tmpDir %>/nurt-instrumented.js': ['<%= properties.tmpDir %>/instrumented-src/<%= properties.srcDir %>/nurt/**']
        }
      }
    },

    init: {
      options: {
        workspaceDir: "../",
        nurtOrigin: 'ssh://git@stash.nurt.com:7999/nurt/nurt.git',
        nurtDirName: "nurt",
        questOrigin: 'ssh://git@stash.nurt.com:7999/cnsl/quest.git',
        questDirName: "quest",
        flextagTagDirName: "flextag/tag",
        flextagTagOrigin: 'ssh://git@stash.nurt.com:7999/ft/tag.git',
        flextagViewerDirName: "flextag/viewer",
        flextagViewerOrigin: 'ssh://git@stash.nurt.com:7999/ft/viewer.git',
        tomcatHost: "local.nurt.corp:8443"
      }
    },

    concat: {
      campaignSuiteComponentScripts: {
        src: [
          '<%= properties.componentDir %>/jquery/dist/jquery.js',
          '<%= properties.componentDir %>/static/jquery-ui.js',
          '<%= properties.componentDir %>/json3/lib/json3.js',
          '<%= properties.componentDir %>/angular/angular.js',
          '<%= properties.componentDir %>/static/bootstrap.js',
          '<%= properties.componentDir %>/static/angularstrap.js',
          '<%= properties.componentDir %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
          '<%= properties.componentDir %>/bootstrap-switch/static/js/bootstrap-switch.js',
          '<%= properties.componentDir %>/typeahead.js/dist/typeahead.min.js',
          '<%= properties.componentDir %>/moment/moment.js',
          '<%= properties.componentDir %>/hogan/web/1.0.0/hogan.js',
          '<%= properties.componentDir %>/ng-grid/ng-grid.js',
          '<%= properties.componentDir %>/ng-grid/ng-grid-flexible-height.js',
          '<%= properties.componentDir %>/static/fineuploader.js',
          '<%= properties.componentDir %>/swfobject/swfobject/swfobject.js',
          '<%= properties.componentDir %>/static/flowplayer/flowplayer.js',
          '<%= properties.componentDir %>/static/date.js',
          '<%= properties.componentDir %>/static/d3.js',
          '<%= properties.componentDir %>/static/nvtooltip.js',
          '<%= properties.componentDir %>/static/jquery.slimscroll.min.js',
           '<%= properties.componentDir %>/static/infiniteScroll.js',
           '<%= properties.componentDir %>/static/select2.min.js',
           '<%= properties.componentDir %>/static/codemirror.js',
           '<%= properties.componentDir %>/static/sql.js',
           '<%= properties.componentDir %>/static/ui-codemirror.js',
           '<%= properties.componentDir %>/static/colorize.js',
       
        ],
        dest: '<%= properties.tmpDir %>/components.js'
      },

      campaignSuiteComponentStyles: {
        src: [
          '<%= properties.componentDir %>/static/bootstrap.css',
          '<%= properties.componentDir %>/static/typeahead-bootstrap.css',
          '<%= properties.componentDir %>/static/font-awesome.css',
          '<%= properties.componentDir %>/typeahead.js/dist/typeahead.min.css',
          '<%= properties.componentDir %>/bootstrap-datepicker/css/datepicker.css',
          '<%= properties.componentDir %>/static/fineuploader.css',
          '<%= properties.componentDir %>/static/angular.treeview.css',
          '<%= properties.componentDir %>/static/codemirror.css',
          '<%= properties.componentDir %>/static/eclipse.css',
          '<%= properties.componentDir %>/static/flowplayer/skin/minimalist.css',
          '<%= properties.componentDir %>/static/select2.css',
          '<%= properties.componentDir %>/ng-grid/ng-grid.css',
          '<%= properties.componentDir %>/static/jquery.qtip.css',
        ],
        dest: '<%= properties.tmpDir %>/components.css'
      },
      audienceSuiteComponentScripts: {
        src: [
          '<%= properties.componentDir %>/jquery/dist/jquery.js',
          '<%= properties.componentDir %>/static/jquery-ui.js',
          '<%= properties.componentDir %>/json3/lib/json3.js',
          '<%= properties.componentDir %>/angular/angular.js',
          '<%= properties.componentDir %>/static/bootstrap3.js',
          '<%= properties.componentDir %>/static/angular-ui.bootstrap.js',
          '<%= properties.componentDir %>/static/angular-ui.bootstrap.tpls.js',
          '<%= properties.componentDir %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
          '<%= properties.componentDir %>/bootstrap-switch/static/js/bootstrap-switch.js',
          '<%= properties.componentDir %>/typeahead.js/dist/typeahead.min.js',
          '<%= properties.componentDir %>/moment/moment.js',
          '<%= properties.componentDir %>/hogan/web/1.0.0/hogan.js',
          '<%= properties.componentDir %>/static/date.js',
          '<%= properties.componentDir %>/static/d3.js',
          '<%= properties.componentDir %>/static/nvtooltip.js',
          '<%= properties.componentDir %>/ace-builds/src/ace.js',
          '<%= properties.componentDir %>/ace-builds/src/mode-html.js',
          '<%= properties.componentDir %>/angular-ui-ace/ui-ace.js',
          '<%= properties.componentDir %>/static/jquery-textcomplete.js',
          '<%= properties.nodeModulesDir %>/lodash/dist/lodash.js',
          '<%= properties.componentDir %>/nurttable/dist/nurttable.js'
        ],
        dest: '<%= properties.tmpDir %>/as-components.js'
      },
      reportCenterComponentScripts: {
        src: [
            '<%= properties.componentDir %>/static/jquery.js',
            '<%= properties.componentDir %>/static/jquery-ui.js',
            '<%= properties.componentDir %>/json3/lib/json3.js',
            '<%= properties.componentDir %>/angular/angular.js',
            '<%= properties.componentDir %>/static/bootstrap.js',
            '<%= properties.componentDir %>/static/angularstrap-0.7.5.js',
            '<%= properties.componentDir %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
            '<%= properties.componentDir %>/bootstrap-switch/static/js/bootstrap-switch.js',
            '<%= properties.componentDir %>/typeahead.js/dist/typeahead.min.js',
            '<%= properties.componentDir %>/moment/moment.js',
            '<%= properties.componentDir %>/hogan/web/1.0.0/hogan.js',
            '<%= properties.componentDir %>/static/fineuploader.js',
            '<%= properties.componentDir %>/static/flowplayer/flowplayer-3.2.8.min.js',
            '<%= properties.componentDir %>/static/date.js',
            '<%= properties.componentDir %>/d3/d3.js',
            '<%= properties.componentDir %>/static/nvtooltip.js',
            '<%= properties.componentDir %>/static/jquery.slimscroll.min.js',
            '<%= properties.componentDir %>/static/infiniteScroll.js',
            '<%= properties.componentDir %>/static/select2.min.js',
            '<%= properties.componentDir %>/static/topojson.v1.min.js',
            '<%= properties.componentDir %>/static/queue.v1.min.js',
            '<%= properties.componentDir %>/static/codemirror.js',
            '<%= properties.componentDir %>/static/sql.js',
            '<%= properties.componentDir %>/static/ui-codemirror.js',
            '<%= properties.componentDir %>/static/colorize.js',
            '<%= properties.componentDir %>/static/jquery.dataTables.min.js',
            '<%= properties.componentDir %>/static/FixedColumns.min.js',
            '<%= properties.componentDir %>/static/fixed_table_rc.js',
            '<%= properties.componentDir %>/ng-grid/ng-grid.js',
            '<%= properties.componentDir %>/ng-grid/ng-grid-flexible-height.js',
            '<%= properties.componentDir %>/static/jquery.qtip.js'
        ],
        dest: '<%= properties.tmpDir %>/rc-components.js'
       },
      audienceSuiteComponentStyles: {
        src: [
          '<%= properties.componentDir %>/unicorn/dist/unicorn.css',
          '<%= properties.componentDir %>/static/typeahead-bootstrap.css',
          '<%= properties.componentDir %>/typeahead.js/dist/typeahead.min.css',
          '<%= properties.componentDir %>/bootstrap-datepicker/css/datepicker.css',
          '<%= properties.componentDir %>/bootstrap-switch/static/stylesheets/bootstrap-switch.css',
          '<%= properties.componentDir %>/nurttable/dist/nurttable.css'
        ],
        dest: '<%= properties.tmpDir %>/as-components.css'
      },

      insightsReportComponentScripts: {
        src: [
          '<%= properties.componentDir %>/jquery/dist/jquery.js',
          '<%= properties.componentDir %>/static/jquery-ui.js',
          '<%= properties.componentDir %>/json3/lib/json3.js',
          '<%= properties.componentDir %>/angular/angular.js',
          '<%= properties.componentDir %>/static/bootstrap3.js',
          '<%= properties.componentDir %>/static/ui-bootstrap-tpls-0.10.0.js',
          '<%= properties.componentDir %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
          '<%= properties.componentDir %>/bootstrap-switch/static/js/bootstrap-switch.js',
          '<%= properties.componentDir %>/angular-ui-bootstrap-0.11/src/position/position.js',
          '<%= properties.componentDir %>/moment/moment.js',
          '<%= properties.componentDir %>/hogan/web/1.0.0/hogan.js',
          '<%= properties.componentDir %>/static/date.js',
          '<%= properties.componentDir %>/d3/d3.min.js',
          '<%= properties.componentDir %>/static/nvtooltip.js',
          '<%= properties.componentDir %>/ace-builds/src/ace.js',
          '<%= properties.componentDir %>/ace-builds/src/mode-html.js',
          '<%= properties.componentDir %>/angular-ui-ace/ui-ace.js',
          '<%= properties.componentDir %>/static/jquery-textcomplete.js',
          '<%= properties.componentDir %>/select2-3.4.5/select2.min.js'
        ],
        dest: '<%= properties.tmpDir %>/insights-components.js'
      },

      insightsReportComponentStyles: {
        src: [
          '<%= properties.componentDir %>/static/bootstrap3.css',
          '<%= properties.componentDir %>/static/font-awesome.css',
          '<%= properties.componentDir %>/bootstrap-datepicker/css/datepicker.css',
          '<%= properties.componentDir %>/bootstrap-switch/static/stylesheets/bootstrap-switch.css',
          '<%= properties.componentDir %>/select2-3.4.5/select2.css',
          '<%= properties.componentDir %>/select2-3.4.5/select2-bootstrap.css',
        ],
        dest: '<%= properties.tmpDir %>/insights-components.css'  
      },

      reportCenterHtmlJsToTmp : {
          src: [
              '<%= properties.tmptmpDir %>/reportCenter.js',
              '<%= properties.tmptmpDir %>/reportCenterViews.js'
          ],
          dest: '<%= properties.tmpDir %>/reportCenter.js'
      },

      conf: {
          src: ['./conf.' + getEnvName() + '.js'],
          dest: '<%= properties.srcDir %>/nurt/conf.js'
      }
    },

    watch: {
      options: {
        livereload: 9102
      },
      templates: {
        files: ['<%= properties.templateDir %>/**'],
        tasks: ["copy:devTemplates"]
      },
      src: {
        files: [
          '<%= properties.srcDir %>/*',
          '<%= properties.srcDir %>/nurt/**',
          '<%= properties.srcDir %>/campaignSuite/**',
          '<%= properties.srcDir %>/audienceSuite/**',
          '<%= properties.srcDir %>/insightsReport/**',
          '<%= properties.srcDir %>/reportCenter/**',
          '<%= properties.srcDir %>/i18n/**'
        ],

        tasks: ["browserify:campaignSuite", "browserify:audienceSuite", "browserify:insightsReport", "buildReportsCenterToTmp", "browserify:nurt", 'build-i18nPackages', 'copy:devScripts']

      },
      styles: {
        files: ['<%= properties.styleDir %>/**'],
        tasks: ["concat:campaignSuiteComponentStyles", "concat:audienceSuiteComponentStyles", "compass", "copy:devStyles" ]
      },
      components: {
        files: ['<%= properties.componentDir %>/**'],
        tasks: ["concat:campaignSuiteComponentScripts", "concat:audienceSuiteComponentScripts","concat:reportCenterComponentScripts", "concat:audienceSuiteComponentStyles", "concat:campaignSuiteComponentStyles", "concat:insightsReportComponentScripts", "concat:insightsReportComponentStyles", 'copy:devScripts', 'copy:devComponents']
      }
    },

    compass: {
      campaignSuite: {
        options: getCompassOptions('<%= properties.styleDir %>/campaignSuite/')
      },
      audienceSuiteLegacy: {
        options: getCompassOptions('<%= properties.styleDir %>/audienceSuiteLegacy/')
      },
      insightsReport: {
        options: getCompassOptions('<%= properties.styleDir %>/insightsReport/')
      },
      audienceSuite: {
        options: getCompassOptions('<%= properties.styleDir %>/audienceSuite/')
      },
      reportCenter: {
        options: getCompassOptions('<%= properties.styleDir %>/reportCenter/')
      }
    },
    
    server:{
      dev: {
        port: 9101,
        serve: {
          '/': ['<%= properties.devServerDir %>/template/campaignSuite/main.jsp'],
          '/campaign-suite': ['<%= properties.devServerDir %>/template/campaignSuite/main.jsp'],
          '/audience-suite': ['<%= properties.devServerDir %>/template/audienceSuite/main.jsp'],
          '/insights-report': ['<%= properties.devServerDir %>/template/insightsReport/main.html'],
          '/reportCenter': ['<%= properties.devServerDir %>/template/reportCenter/main.jsp'],
          '/reportCenterLineItem': ['<%= properties.devServerDir %>/template/reportCenter/reports/lineItemPerformance/index.html'],
          '/webapp/': ['<%= properties.devServerDir %>'],
          '': ['<%= properties.devServerDir %>']
        },
        endpoints: './dev/endpoints.js'
      },
      devProxy: {
        jaxProxy: 'https://app157.sjc2.nurt.com:8443',
        port: 9101,
        serve: {
          '/': ['<%= properties.devServerDir %>/template/campaignSuite/main.jsp'],
          '/campaign-suite': ['<%= properties.devServerDir %>/template/campaignSuite/main.jsp'],
          '/audience-suite': ['<%= properties.devServerDir %>/template/audienceSuite/main.jsp'],
          '/insights-report': ['<%= properties.devServerDir %>/template/insightsReport/main.html'],
          '/reportCenter': ['<%= properties.devServerDir %>/template/reportCenter/main.jsp'],
          '/reportCenter/': ['<%= properties.devServerDir %>'],
          '/webapp/': ['<%= properties.devServerDir %>'],
          '': ['<%= properties.devServerDir %>']
        },
        endpoints: './dev/endpoints.js'
      },
      dist: {
        port: 9101,
        serve: {
          '/': ['<%= properties.distDir %>/template/campaignSuite/main.jsp'],
          '/campaign-suite': ['<%= properties.devServerDir %>/template/campaignSuite/main.jsp'],
          '/audience-suite': ['<%= properties.devServerDir %>/template/audienceSuite/main.jsp'],
          '/insights-report': ['<%= properties.devServerDir %>/template/insightsReport/main.html'],
          '/report-center': ['<%= properties.devServerDir %>/template/reportCenter/index.jsp'],
          '/webapp/': ['<%= properties.devServerDir %>'],
          '': ['<%= properties.distDir %>']
        },
        endpoints: './dev/endpoints.js'
      }
    },

    uglify: {
      campaignSuite: {
        src: ['<%= _.keys(browserify.campaignSuite.files)[0] %>'],
        dest: '<%= properties.distDir %>/campaignSuite.js'
      },
      audienceSuite: {
        src: ['<%= _.keys(browserify.audienceSuite.files)[0] %>'],
        dest: '<%= properties.distDir %>/audienceSuite.js'
      },
      insightsReport: {
        // TODO remove the options once the zoom bug is fix
        options: {
            mangle: false
        },
        src: ['<%= _.keys(browserify.insightsReport.files)[0] %>'],
        dest: '<%= properties.distDir %>/insightsReport.js'
      },
      reportCenter: {
          src: ['<%= properties.tmpDir %>/reportCenter.js'],
          dest: '<%= properties.distDir %>/reportCenter.js'
      },
      nurt: {
        src: ['<%= _.keys(browserify.nurt.files)[0] %>'],
        dest: '<%= properties.distDir %>/nurt.js'
      },
      components: {
        src: ['<%= concat.campaignSuiteComponentScripts.dest %>'],
        dest: '<%= properties.distDir %>/components.js'
      },
      audienceSuiteComponents: {
        src: ['<%= concat.audienceSuiteComponentScripts.dest %>'],
        dest: '<%= properties.distDir %>/as-components.js'
      },
      insightsReportComponents: {
        src: ['<%= concat.insightsReportComponentScripts.dest %>'],
        dest: '<%= properties.distDir %>/insights-components.js'
      },
      reportCenterComponents : {
          src: ['<%= concat.reportCenterComponentScripts.dest %>'],
          dest: '<%= properties.distDir %>/rc-components.js'
      }
    },

    jasmine: {
      campaignSuite: {
        src: [
          '<%= properties.tmpDir %>/nurt.js',
          '<%= properties.tmpDir %>/i18n/en-us.js',
          '<%= properties.tmpDir %>/campaignSuite.js',
          '<%= properties.tmpDir %>/test.js',
              ],
        options: {
         specs: [
             
              '<%= properties.testDir %>/campaignSuite/**/*.js',
              '<%= properties.testDir %>/nurt/**/*.js'
              ],
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/components.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js',
            '<%= properties.testDir %>/mocks.js',
            '<%= properties.componentDir %>/static/codemirror.js',
            '<%= properties.componentDir %>/static/ui-codemirror.js'
           
          ],
          keepRunner: true
        }
      },
      reportCenter: {
          src: [
            '<%= properties.tmpDir %>/nurt.js',
            '<%= properties.tmpDir %>/i18n/en-us.js',
            '<%= properties.tmpDir %>/reportCenter.js',
            '<%= properties.tmpDir %>/test.js'],
        
          options: {
           specs: [
               '<%= properties.testDir%>/reportCenter/design/*.js',
               '<%= properties.testDir%>/reportCenter/datamine/**/*.js'
                ],
            vendor: [
              '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
              '<%= properties.tmpDir %>/rc-components.js',
              '<%= properties.componentDir %>/static/angular-mocks.js',
              '<%= properties.componentDir %>/static/sinon.js',
              '<%= properties.testDir %>/mocks.js',
              '<%= properties.componentDir %>/static/codemirror.js',
              '<%= properties.componentDir %>/static/ui-codemirror.js',
              '<%= properties.componentDir %>/static/date.js'
            ],
            keepRunner: true
          }
        },
      audienceSuite: {
        src: [
          '<%= properties.tmpDir %>/audienceSuite.js',
        ],
        options: {
          specs: '<%= properties.testDir %>/audienceSuite/**/*.js',
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/as-components.js',
            '<%= properties.tmpDir %>/nurt.js',
            '<%= properties.tmpDir %>/i18n/en-us.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js'
          ],
          keepRunner: true
        }
      },
      insightsReport: {
        src: [
          '<%= properties.tmpDir %>/insightsReport.js',
        ],
        options: {
          specs: '<%= properties.testDir %>/insightsReport/**/*.js',
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/insights-components.js',
            '<%= properties.tmpDir %>/nurt.js',
            '<%= properties.tmpDir %>/i18n/en-us.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js'
          ],
          keepRunner: true
        }
      },
      campaignSuiteCoverage: {
        src: [
          '<%= properties.tmpDir %>/nurt-instrumented.js',
          '<%= properties.tmpDir %>/i18n/en-us.js',
          '<%= properties.tmpDir %>/campaignSuite-instrumented.js',
          '<%= properties.tmpDir %>/test.js'
        ],
        options: {
          specs: [
            '<%= properties.testDir %>/campaignSuite/**/*.js',
            '<%= properties.testDir %>/nurt/**/*.js'
          ],
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/components.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js',
            '<%= properties.testDir %>/mocks.js'
          ],
          junit: {
              path: '<%= properties.reportsDir %>/campaignSuite/JUnit'
          },
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            replace: false,
            coverage: '<%= properties.tmpDir %>/campaignSuiteCoverage.json',
            report: [{
              type: 'html',
              options: { dir: '<%= properties.reportsDir %>/campaignSuite/html' }
            }, {
              type: 'cobertura',
              options: { dir: '<%= properties.reportsDir %>/campaignSuite/cobertura' }
            }]
          }
        }
      },
      audienceSuiteCoverage: {
        src: [
          '<%= properties.tmpDir %>/audienceSuite-instrumented.js',
        ],
        options: {
          specs: '<%= properties.testDir %>/audienceSuite/**/*.js',
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/as-components.js',
            '<%= properties.tmpDir %>/nurt.js',
            '<%= properties.tmpDir %>/i18n/en-us.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js'
          ],
          junit: {
              path: '<%= properties.reportsDir %>/audienceSuite/JUnit'
          },
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            replace: false,
            coverage: '<%= properties.tmpDir %>/audienceSuiteCoverage.json',
            report:  [{
              type: 'html',
              options: { dir: '<%= properties.reportsDir %>/audienceSuite/html' }
            }, {
              type: 'cobertura',
              options: { dir: '<%= properties.reportsDir %>/audienceSuite/cobertura' }
            }]
          }
        }        
      },
      insightsReportCoverage: {      
         src: [
          '<%= properties.tmpDir %>/insightsReport-instrumented.js',
        ],
        options: {
          specs: '<%= properties.testDir %>/insightsReport/**/*.js',
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/insights-components.js',
            '<%= properties.tmpDir %>/nurt.js',
            '<%= properties.tmpDir %>/i18n/en-us.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js'
          ],
          junit: {
              path: '<%= properties.reportsDir %>/insightsReport/JUnit'
          },
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            replace: false,
            coverage: '<%= properties.tmpDir %>/insightsReportCoverage.json',
            report: [{
              type: 'html',
              options: { dir: '<%= properties.reportsDir %>/insightsReport/html' }
            }, {
              type: 'cobertura',
              options: { dir: '<%= properties.reportsDir %>/insightsReport/cobertura' }
            }]
          }
        }
      },
      reportCenterCoverage: {
        src: [
          '<%= properties.tmpDir %>/nurt-instrumented.js',
          '<%= properties.tmpDir %>/i18n/en-us.js',
          '<%= properties.tmpDir %>/reportCenter.js',
          '<%= properties.tmpDir %>/test.js'
        ],
        options: {
          specs: [
            '<%= properties.testDir%>/reportCenter/design/*.js',
            '<%= properties.testDir%>/reportCenter/datamine/**/*.js'
          ],
          vendor: [
            '<%= properties.componentDir %>/static/disableTimeZoneLoader.js',
            '<%= properties.tmpDir %>/rc-components.js',
            '<%= properties.componentDir %>/static/angular-mocks.js',
            '<%= properties.componentDir %>/static/sinon.js',
            '<%= properties.testDir %>/mocks.js',
            '<%= properties.componentDir %>/static/codemirror.js',
            '<%= properties.componentDir %>/static/ui-codemirror.js',
            '<%= properties.componentDir %>/static/date.js'
          ],
          junit: {
              path: '<%= properties.reportsDir %>/reportCenter/JUnit'
          },
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            replace: false,
            coverage: '<%= properties.tmpDir %>/reportCenterCoverage.json',
            report: [{
              type: 'html',
              options: { dir: '<%= properties.reportsDir %>/reportCenter/html' }
            }, {
              type: 'cobertura',
              options: { dir: '<%= properties.reportsDir %>/reportCenter/cobertura' }
            }]
          }
        }
      },

    },

    cssmin: {

        dist: {
            files: {
                "<%= properties.distDir %>/components.css": "<%= concat.campaignSuiteComponentStyles.dest %>",
                "<%= properties.distDir %>/as-components.css": "<%= concat.audienceSuiteComponentStyles.dest %>",
                "<%= properties.distDir %>/insights-components.css": "<%= concat.insightsReportComponentStyles.dest %>",
                "<%= properties.distDir %>/campaignSuite.css": "<%= properties.tmpDir %>/campaignSuite.css",
                "<%= properties.distDir %>/audienceSuite.css": "<%= properties.tmpDir %>/audienceSuite.css",
                "<%= properties.distDir %>/insightsReport.css": "<%= properties.tmpDir %>/insightsReport.css",
                "<%= properties.distDir %>/reportCenter.css": "<%= properties.tmpDir %>/reportCenter.css",
        "<%= properties.distDir %>/audienceSuiteLegacy.css": "<%= properties.tmpDir %>/audienceSuiteLegacy.css",
				        "<%= properties.distDir %>/audienceSuiteShared.css": "<%= properties.tmpDir %>/audienceSuiteShared.css"
            }
        }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Explorer >= 11',
          'last 2 Chrome versions',
          'last 2 Firefox versions'
        ],
        cascade: true
      },
      audienceSuite: {
        src: '<%= properties.tmpDir %>/audienceSuite.css',
        dest: '<%= properties.tmpDir %>/audienceSuite.css'
      },
      campaignSuite: {
        src: '<%= properties.tmpDir %>/campaignSuite.css',
        dest: '<%= properties.tmpDir %>/campaignSuite.css'
      },
      insightsReport: {
        src: '<%= properties.tmpDir %>/insightsReport.css',
        dest: '<%= properties.tmpDir %>/insightsReport.css'
      },
      audienceSuiteLegacy: {
        src: '<%= properties.tmpDir %>/audienceSuiteLegacy.css',
        dest: '<%= properties.tmpDir %>/audienceSuiteLegacy.css'
      },
      audienceSuiteShared: {
        src: '<%= properties.tmpDir %>/audienceSuiteShared.css',
        dest: '<%= properties.tmpDir %>/audienceSuiteShared.css'
      },
      campaignSuiteComponents: {
        src: '<%= properties.tmpDir %>/components.css',
        dest: '<%= properties.tmpDir %>/components.css'
      },
      audienceSuiteComponents: {
        src: '<%= properties.tmpDir %>/as-components.css',
        dest: '<%= properties.tmpDir %>/as-components.css'
      },
      insightsReportComponents: {
        src: '<%= properties.tmpDir %>/insights-components.css',
        dest: '<%= properties.tmpDir %>/insights-components.css'
      }
    },

    jshint: {
      dev: {
        options: {
          multistr:true,
          laxcomma:true,
          laxbreak : true,
          smarttabs:true,
          force: true
        },
        files: {
          src: [
            "<%= properties.srcDir %>/**/*.js",
            "!<%= properties.srcDir %>/nurt/valueObjects/**/*.js",
            "!<%= properties.srcDir %>/nurtDev/**/*.js",
            "!<%= properties.srcDir %>/test/**/*.js",
            "!<%= properties.srcDir %>/i18n/**/*.js"
          ]
        }
      },

      dist: {
        options: {
          force: false
        },
        files: {
          src: [
            "<%= properties.srcDir %>/**/*.js",
            "!<%= properties.srcDir %>/nurt/valueObjects/**/*.js",
            "!<%= properties.srcDir %>/nurtDev/**/*.js",
            "!<%= properties.srcDir %>/test/**/*.js",
            "!<%= properties.srcDir %>/i18n/**/*.js"
          ]
        }
      },

      options: {
        jshintrc: '.jshintrc'
      }
    },

    shell: {
        valueObjects:{
        command: "ant -f <%= properties.nurtDir %>/build.xml generate-jsvo",
        stdout: true,
        stderr: true
      }
    },

    html2js: {
        reportCenterHtmlToTmpTmp: {
          options: {
              base: '<%= properties.srcDir %>/reportCenter'
          },
          src: ['<%= properties.srcDir %>/reportCenter/**/*.tpl.html','<%= properties.srcDir %>/reportCenter/datamine/**/*.tpl.html'],
          dest:  '<%= properties.tmptmpDir %>/reportCenterViews.js',
          module: 'views.reportCenter'
      }
    },

    instrument: {
      files: [
        '<%= properties.srcDir %>/audienceSuite/**/*.js',
        '<%= properties.srcDir %>/campaignSuite/**/*.js',
        '<%= properties.srcDir %>/insightsReport/**/*.js',
        '<%= properties.srcDir %>/reportCenter/**/*.js',
        '<%= properties.srcDir %>/shared/**/*.js',
        '<%= properties.srcDir %>/nurt/**/*.js'
      ],
      options: {
        lazy: false,
        basePath: '<%= properties.tmpDir %>/instrumented-src/'
      }
    }
  };

  grunt.registerTask('buildReportsCenterToTmp', [
    'browserify:reportCenterJsToTmpTmp',
    'html2js:reportCenterHtmlToTmpTmp',
    'concat:reportCenterHtmlJsToTmp',
    'clean:tmptmp',
    'compass:reportCenter'
  ]);

  grunt.registerTask('build', [
    'clean:tmp',
    'build-confFile',
    'concat:campaignSuiteComponentScripts',
    'concat:campaignSuiteComponentStyles',
    'concat:audienceSuiteComponentScripts',
    'concat:reportCenterComponentScripts',
    'concat:audienceSuiteComponentStyles',
    'concat:insightsReportComponentScripts',
    'concat:insightsReportComponentStyles',
    'compass:campaignSuite',
    'compass:audienceSuite',
    'compass:insightsReport',
    'compass:audienceSuiteLegacy',
    'autoprefixer:campaignSuite',
    'autoprefixer:audienceSuite',
    'autoprefixer:insightsReport',
    'autoprefixer:audienceSuiteLegacy',
    'autoprefixer:audienceSuiteShared',
    'autoprefixer:campaignSuiteComponents',
    'autoprefixer:audienceSuiteComponents',
    'autoprefixer:insightsReportComponents',
    'browserify:campaignSuite',
    'browserify:audienceSuite',
    'browserify:insightsReport',
    'buildReportsCenterToTmp',
    'browserify:nurt',
    'build-i18nPackages'
  ]);

  /**
   * Instruments sources in preparation for Istanbul code coverage.
   *
   * Note the browserify:campaignSuite and browserify:nurt tasks--all project
   * spec runners require nurt, and the Report Center spec runner
   * requires nurt *and* Campaign Suite. If they used the instrumented sources,
   * the preceding vendor sources would be horrendously included in the final
   * coverage report.
   *
   * To rectify this, the aforementioned spec runners use non-instrumented bundles
   * produced through browserify:campaignSuite and browserify:nurt.
   *
   * Only the Campaign Suite project actually has tests written against nurt, so it
   * gets an instrumented nurt bundle.
   */
  grunt.registerTask('build-coverage', [
    'clean:tmp',
    'browserify:campaignSuite',
    'browserify:nurt',
    'instrument',
    'browserify:instrumented',
    'concat:audienceSuiteComponentScripts',
    'concat:campaignSuiteComponentScripts',
    'concat:insightsReportComponentScripts',
    'concat:reportCenterComponentScripts',
    'html2js:reportCenterHtmlToTmpTmp',
    'concat:reportCenterHtmlJsToTmp',
    'clean:tmptmp',
    'build-i18nPackages'
  ]);

  grunt.registerTask('build-dev', [
    'build',
    'clean:dev',
    'jshint:dev',
    'copy:devTemplates',
    'copy:devScripts',
    'copy:devStyles',
    'copy:devComponents',
    'copy:devData',
    'copy:devImages'
  ]);

  grunt.registerTask('dev', [
    'build-dev',
    'browserify:test',
    'server:dev',
    'watch'
  ]);

  grunt.registerTask('dev-no-test', [
    'build-dev',
    'server:dev',
    'watch'
  ]);

  grunt.registerTask('dev-proxy', [
    'build-dev',
    'server:devProxy',
    'watch'
  ]);

  grunt.registerTask('first-time', [
    'build-dev',
    'init'
  ]);

  grunt.registerTask('release', [
    'build',
    'clean:dist',
    'jshint:dist',
    'build-i18nPackages',
    'globMin',
    'uglify',
    'cssmin',
    'copy:dist'
  ]);

  grunt.registerTask('lint', 'jshint:dist');
  grunt.registerTask('default', 'release');

  grunt.registerTask('test', [
    'build',
    'browserify:test',
    'jasmine:campaignSuite',
    'jasmine:audienceSuite',
    'jasmine:insightsReport',
    'jasmine:reportCenter'
  ]);

  /**
   * Generates a code coverage report.
   *
   * The interesting parts are number 2 and 4.
   *
   * Process
   * -------
   * 1. Clean temporary folders.
   * 2. Instrument sources using Istanbul and prepare vendor code.
   *    - Report center generated sources (views) are not instrumented.
   *    - Generate non-instrumented nurt bundle and Campaign Suite bundle.
   * 3. Bundle test helper sources.
   * 4. For each project, run an instance of jasmine with an istanbul template
   *    mixed into the spec runner. Projects:
   *
   *    - Campaign Suite:   Campaign Suite includes nurt. Use instrumented nurt
   *                        bundle, since Campaign Suite contains nurt tests.
   *    - Audience Suite:   Audience Suite includes nurt. Use non-instrumented nurt
   *                        bundle.
   *    - Insights Report:  Insights Report includes nurt. Use non-instrumented nurt
   *                        bundle.
   *    - Report Center:    Report Center includes nurt and Campaign Suite. Use
   *                        the non-instrumented bundles.
   *
   * 5. Reports are generated in /reports
   *
   * The non-instrumented bundle includes are important in ensuring that vendor
   * sources do not get included in the final coverage report.
   */
  grunt.registerTask('coverage-test', [
    'clean:reports',
    'build-coverage',
    'browserify:test',
    'jasmine:campaignSuiteCoverage',
    'jasmine:audienceSuiteCoverage',
    'jasmine:insightsReportCoverage',
    'jasmine:reportCenterCoverage'
  ]);

  grunt.registerTask('test-insights-report', [
    'build',
    'browserify:test',
    'jasmine:insightsReport'
  ]);

  grunt.registerTask('test-audience_suite', [
    'build',
    'browserify:test',
    'jasmine:audienceSuite'
  ]);

  grunt.registerTask('build-valueObjects', [
    'shell:valueObjects',
    'copy:valueObjects'
  ]);

  grunt.registerTask('build-confFile', [
    'clean:conf',
    'concat:conf'
  ]);

  grunt.initConfig(config);
};
