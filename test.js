/* istanbul instrument in package apidoc */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = local.global.utility2.objectSetDefault(
                local.global.utility2_rollup || local.global.local,
                local.global.utility2
            );
            break;
        // re-init local from example.js
        case 'node':
            local = (local.global.utility2_rollup || require('utility2'))
                .requireExampleJsFromReadme();
            break;
        }
        // export local
        local.global.local = local;
    }());



    // run shared js-env code - function
    (function () {
        return;
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        break;



    // run node js-env code - function
    case 'node':
        local.testCase_apidocCreate_default = function (options, onError) {
        /*
         * this function will test apidocCreate's default handling-behavior-behavior
         */
            options = {
                // test dir-custom handling-behavior
                dir: local.utility2.__dirname
            };
            local.apidocCreate(options);
            options = {
                // test libFilelist-custom handling-behavior
                libFileList: ['lib.apidoc.js', 'package.json'],
                // test invalid module-name handling-behavior
                moduleDict: { 'invalid syntax': {} },
                // test packageJson default handling-behavior
                packageJson: {},
                // test markdown-template handling-behavior
                template: local.templateApidocMd
            };
            local.apidocCreate(options);
            local.testMock([
                // test libFileList-error handling-behavior
                [local.fs, { readdirSync: function () {
                    return ['undefined'];
                } }]
            ], function (onError) {
                options = {};
                local.apidocCreate(options);
                onError();
            }, onError);
        };

        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior-behavior
         */
            options = {};
            options.customize = function () {
                // search-and-replace - customize dataTo
                [
                    // customize demo
                    (/\n\[!\[package-listing\][\S\s]*?\n# documentation\n/),
                    // customize test-server
                    (/\n\| git-branch : \|[\S\s]*?\n\| test-report : \|/),
                    // customize quickstart
                    (/\n# quickstart[\S\s]*?\n# package.json\n/)
                ].forEach(function (rgx) {
                    options.dataFrom.replace(rgx, function (match0) {
                        options.dataTo = options.dataTo.replace(rgx, match0);
                    });
                });
            };
            local.buildReadme(options, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        return;
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // run tests
        local.nop(local.modeTest &&
            document.querySelector('#testRunButton1') &&
            document.querySelector('#testRunButton1').click());
        break;



    // run node js-env code - post-init
    /* istanbul ignore next */
    case 'node':
        local.testCase_buildApidoc_default = local.testCase_buildApidoc_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApidoc's default handling-behavior-behavior
         */
            options = { modulePathList: module.paths };
            if (local.env.npm_package_buildNpmdoc) {
                local.buildNpmdoc(options, onError);
                return;
            }
            local.buildApidoc(options, onError);
        };

        local.testCase_buildApp_default = local.testCase_buildApp_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApp's default handling-behavior-behavior
         */
            local.testCase_buildReadme_default(options, local.onErrorThrow);
            local.testCase_buildLib_default(options, local.onErrorThrow);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            options = [];
            local.buildApp(options, onError);
        };

        local.testCase_buildLib_default = local.testCase_buildLib_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildLib's default handling-behavior
         */
            options = {};
            local.buildLib(options, onError);
        };

        local.testCase_buildReadme_default = local.testCase_buildReadme_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildReadme's default handling-behavior-behavior
         */
            if (local.env.npm_package_buildNpmdoc) {
                onError();
                return;
            }
            options = {};
            local.buildReadme(options, onError);
        };

        local.testCase_buildTest_default = local.testCase_buildTest_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildTest's default handling-behavior
         */
            options = {};
            local.buildTest(options, onError);
        };

        local.testCase_webpage_default = local.testCase_webpage_default || function (
            options,
            onError
        ) {
        /*
         * this function will test webpage's default handling-behavior
         */
            options = { modeCoverageMerge: true, url: local.serverLocalHost + '?modeTest=1' };
            local.browserTest(options, onError);
        };

        // run test-server
        local.testRunServer(local);
        break;
    }
}());
