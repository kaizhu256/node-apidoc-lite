/* istanbul instrument in package apidoc */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function () {
    "use strict";
    let isBrowser;
    let isWebWorker;
    let local;
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
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
    // init isBrowser
    isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    isWebWorker = (
        isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    function assertJsonEqual(aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        function objectDeepCopyWithKeysSorted(obj) {
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
        }
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    }
    function assertOrThrow(passed, msg) {
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
    }
    function coalesce(...argList) {
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
    }
    function identity(val) {
    /*
     * this function will return <val>
     */
        return val;
    }
    function nop() {
    /*
     * this function will do nothing
     */
        return;
    }
    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {
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
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    local.assertJsonEqual = assertJsonEqual;
    local.assertOrThrow = assertOrThrow;
    local.coalesce = coalesce;
    local.identity = identity;
    local.isBrowser = isBrowser;
    local.isWebWorker = isWebWorker;
    local.nop = nop;
    local.objectAssignDefault = objectAssignDefault;
    local.onErrorThrow = onErrorThrow;
}());
// assets.utility2.header.js - end


/* jslint utility2:true */
(function (local) {
"use strict";


/* istanbul ignore next */
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
let assertJsonEqual;
assertJsonEqual = local.assertJsonEqual;
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
    assertJsonEqual(options.packageJson._, undefined);
    assertJsonEqual(options.packageJson.aa, "bb");
    assertJsonEqual(options.packageJson.emailDict.email, undefined);
    assertJsonEqual(options.packageJson.emailList[0].email, undefined);
    assertJsonEqual(options.packageJson.readme, undefined);
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

local.testCase_moduleDirname_default = function (opt, onError) {
/*
 * this function will test moduleDirname's default handling-behavior
 */
    if (local.isBrowser) {
        onError(undefined, opt);
        return;
    }
    // test null-case handling-behavior
    assertJsonEqual(
        local.moduleDirname(undefined, module.paths),
        process.cwd()
    );
    // test path handling-behavior
    assertJsonEqual(
        local.moduleDirname(".", module.paths),
        process.cwd()
    );
    assertJsonEqual(
        local.moduleDirname("./", module.paths),
        process.cwd()
    );
    assertJsonEqual(
        local.moduleDirname(
            require("path").basename(process.cwd()),
            [
                require("path").dirname(process.cwd())
            ]
        ),
        process.cwd()
    );
    // test module-does-not-exist handling-behavior
    assertJsonEqual(
        local.moduleDirname("syntax-err", module.paths),
        ""
    );
    onError(undefined, opt);
};
}());
}());
