/* istanbul instrument in package apidoc */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 100,
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
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunInit(local);
    }());
    switch (local.modeJs) {



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
                    'invalid syntax': {}
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
            // test weird-module handling-behavior
            options.moduleDict.undefined = function () {
                return;
            };
            options.moduleDict.undefined();
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
            // Working_with_Objects#Defining_getters_and_setters
            Object.defineProperty(options.moduleDict.undefined, 'error', {
                get: local.throwError,
                set: local.throwError
            });
            options.moduleDict.undefined.toString = local.throwError;
            local.apidocCreate(options);
            // validate options
            local.assertJsonEqual(options.packageJson._, undefined);
            local.assertJsonEqual(options.packageJson.aa, 'bb');
            local.assertJsonEqual(options.packageJson.emailDict.email, undefined);
            local.assertJsonEqual(options.packageJson.emailList[0].email, undefined);
            local.assertJsonEqual(options.packageJson.readme, undefined);
            // test swgg.apiDict handling-behavior
            options = {
                moduleDict: { undefined: { swgg: { apiDict: { 'aa bb': {} } } } },
                packageJson: {}
            };
            local.apidocCreate(options);
            // test modeNoApidoc handling-behavior
            options = { modeNoApidoc: true };
            local.apidocCreate(options);
            // test invalid-require handling-behavior
            options = { require: local.nop };
            local.apidocCreate(options);
            onError(null, options);
        };
        break;
    }
}());
