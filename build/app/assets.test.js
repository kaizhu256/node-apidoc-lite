/* istanbul instrument in package apidoc */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debugInline
    if (!globalThis.debugInline) {
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    local.assertJsonEqual = function (aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        let objectDeepCopyWithKeysSorted;
        objectDeepCopyWithKeysSorted = function (obj) {
        /*
         * this function will recursively deep-copy <obj> with keys sorted
         */
            let sorted;
            if (typeof obj !== "object" || !obj) {
                return obj;
            }
            // recursively deep-copy list with child-keys sorted
            if (Array.isArray(obj)) {
                return obj.map(objectDeepCopyWithKeysSorted);
            }
            // recursively deep-copy obj with keys sorted
            sorted = {};
            Object.keys(obj).sort().forEach(function (key) {
                sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
            });
            return sorted;
        };
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    };
    local.assertOrThrow = function (passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    };
    local.coalesce = function (...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
    };
    local.identity = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0
                    && typeof aa === "object" && aa && !Array.isArray(aa)
                    && typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
    };
    // require builtin
    if (!local.isBrowser) {
        if (process.unhandledRejections !== "strict") {
            process.unhandledRejections = "strict";
            process.on("unhandledRejection", function (err) {
                throw err;
            });
        }
        local.fs = require("fs");
        local.path = require("path");
        local.url = require("url");
    }
}((typeof globalThis === "object" && globalThis) || window));
// assets.utility2.header.js - end



/* jslint utility2:true */
/* istanbul ignore next */
(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = globalThis.utility2 || require("utility2");
local = local.requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local.testCase_apidocCreate_default = function (options, onError) {
/*
 * this function will test apidocCreate's default handling-behavior-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    options = {
        // test invalid-exampleFile handling-behavior
        exampleFileList: [
            "undefined"
        ],
        libFileList: [
            // test invalid-libFile handling-behavior
            "lib.undefined.js"
        ],
        moduleDict: {
            // test invalid-module-name handling-behavior
            "invalid name": {}
        },
        // test packageJson handling-behavior
        packageJson: {
            _: "",
            aa: "bb",
            emailDict: {
                email: "a@a.com"
            },
            emailList: [
                {
                    email: "a@a.com"
                }
            ],
            readme: ""
        }
    };
    // test weird-module handling-behavior
    options.moduleDict.undefined = function () {
        return;
    };
    options.moduleDict.undefined();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
    // Working_with_Objects#Defining_getters_and_setters
    Object.defineProperty(options.moduleDict.undefined, "error", {
        get: local.throwError,
        set: local.throwError
    });
    options.moduleDict.undefined.toString = local.throwError;
    local.apidocCreate(options);
    // validate options
    local.assertJsonEqual(options.packageJson._, undefined);
    local.assertJsonEqual(options.packageJson.aa, "bb");
    local.assertJsonEqual(options.packageJson.emailDict.email, undefined);
    local.assertJsonEqual(options.packageJson.emailList[0].email, undefined);
    local.assertJsonEqual(options.packageJson.readme, undefined);
    // test swgg.apiDict handling-behavior
    options = {
        moduleDict: {
            undefined: {
                swgg: {
                    apiDict: {
                        "aa bb": {}
                    }
                }
            }
        },
        packageJson: {}
    };
    local.apidocCreate(options);
    // test modeNoApidoc handling-behavior
    options = {
        modeNoApidoc: true
    };
    local.apidocCreate(options);
    // test invalid-require handling-behavior
    options = {
        require: local.nop
    };
    local.apidocCreate(options);
    onError(null, options);
};
}());
}());
