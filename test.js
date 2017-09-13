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



    // run shared js-env code - init-before
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
            local = (local.global.utility2_rollup ||
                require('utility2')).requireReadme();
            break;
        }
        // init exports
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
                // test readExample-error handling-behavior
                exampleFileList: ['undefined'],
                libFileList: [
                    // test libFileList-error handling-behavior
                    'lib.error.js'
                ],
                moduleDict: {
                    // test invalid module-name handling-behavior
                    'invalid syntax': {},
                    // test weird-module handling-behavior
                    'undefined': local.objectWeird
                },
                // test packageJson handling-behavior
                packageJson: {
                    _: '',
                    aa: 'bb',
                    emailDict: { email: 'a@a.com'},
                    emailList: [{ email: 'a@a.com' }],
                    readme: ''
                }
            };
            local.apidocCreate(options);
            local.assertJsonEqual(options.packageJson._, undefined);
            local.assertJsonEqual(options.packageJson.aa, 'bb');
            local.assertJsonEqual(options.packageJson.emailDict.email, undefined);
            local.assertJsonEqual(options.packageJson.emailList[0].email, undefined);
            local.assertJsonEqual(options.packageJson.readme, undefined);
            options = {
                // test modeNoApidoc handling-behavior
                modeNoApidoc: true
            };
            local.apidocCreate(options);
            options = {
                // test invalid-require handling-behavior
                require: local.nop
            };
            local.apidocCreate(options);
            onError();
        };
        break;
    }



    // run shared js-env code - init-after
    (function () {
        // init objectWeird
        local.objectWeird = function () {
            return;
        };
        // coverage-hack
        local.tryCatchOnError(function () {
            local.objectWeird();
        }, local.nop);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
        // #Defining_getters_and_setters
        Object.defineProperty(local.objectWeird, 'error', {
            get: local.throwError,
            set: local.throwError
        });
        local.objectWeird.toString = local.throwError;
    }());
    switch (local.modeJs) {



    // run browser js-env code - init-after
    /* istanbul ignore next */
    case 'browser':
        local.testCase_browser_nullCase = local.testCase_browser_nullCase || function (
            options,
            onError
        ) {
        /*
         * this function will test browser's null-case handling-behavior
         */
            onError(null, options);
        };

        local.utility2.ajaxForwardProxyUrlTest = local.utility2.ajaxForwardProxyUrlTest ||
            function (url, location) {
            /*
             * this function will test if the url requires forward-proxy
             */
                // jslint-hack
                local.nop(url);
                return local.env.npm_package_nameAlias && (/\bgithub.io$/).test(location.host)
                    ? 'https://h1-' + local.env.npm_package_nameAlias + '-alpha.herokuapp.com'
                    : location.protocol + '//' + location.host;
            };

        // run tests
        if (local.modeTest && document.querySelector('#testRunButton1')) {
            document.querySelector('#testRunButton1').click();
        }
        break;



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        local.testCase_buildApidoc_default = local.testCase_buildApidoc_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApidoc's default handling-behavior
         */
            options = { modulePathList: module.paths };
            local.buildApidoc(options, onError);
        };

        local.testCase_buildApp_default = local.testCase_buildApp_default || function (
            options,
            onError
        ) {
        /*
         * this function will test buildApp's default handling-behavior
         */
            local.testCase_buildReadme_default(options, local.onErrorThrow);
            local.testCase_buildLib_default(options, local.onErrorThrow);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            local.testCase_buildCustomOrg_default(options, local.onErrorThrow);
            options = [];
            local.buildApp(options, onError);
        };

        local.testCase_buildCustomOrg_default = local.testCase_buildCustomOrg_default ||
            function (options, onError) {
            /*
             * this function will test buildCustomOrg's default handling-behavior
             */
                options = {};
                local.buildCustomOrg(options, onError);
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
         * this function will test buildReadme's default handling-behavior
         */
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
