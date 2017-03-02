#!/usr/bin/env node
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



    /* istanbul ignore next */
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
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.apidoc = local;
    }());



    /* istanbul ignore next */
    // run shared js-env code - pre-function
    (function () {
        local.assert = function (passed, message) {
        /*
         * this function will throw the error message if passed is falsey
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // if message is an error-object, then leave it as is
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            throw error;
        };

        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in the arg
         */
            arg = arg || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                defaults2 = defaults[key];
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    // recurse
                    local.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.stringHtmlSafe = function (text) {
        /*
         * this function will replace '&' to '&amp;', '<' to '&lt;',
         * and '>' to '&gt;' in the text to make it htmlSafe
         */
            return text
                .replace((/&/g), '&amp;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;')
                .replace((/"/g), '&quot;')
                .replace((/'/g), '&#x27;')
                .replace((/`/g), '&#x60;');
        };

        local.templateRender = function (template, dict) {
        /*
         * this function will render the template with the given dict
         */
            var argList, getValue, match, renderPartial, rgx, value;
            dict = dict || {};
            getValue = function (key) {
                argList = key.split(' ');
                value = dict;
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value;
            };
            renderPartial = function (match0, helper, key, partial) {
                switch (helper) {
                case 'each':
                    value = getValue(key);
                    return Array.isArray(value)
                        ? value.map(function (dict) {
                            // recurse with partial
                            return local.templateRender(partial, dict);
                        }).join('')
                        : '';
                case 'if':
                    partial = partial.split('{{#unless ' + key + '}}');
                    partial = getValue(key)
                        ? partial[0]
                        // handle 'unless' case
                        : partial.slice(1).join('{{#unless ' + key + '}}');
                    // recurse with partial
                    return local.templateRender(partial, dict);
                case 'unless':
                    return getValue(key)
                        ? ''
                        // recurse with partial
                        : local.templateRender(partial, dict);
                default:
                    // recurse with partial
                    return match0[0] + local.templateRender(match0.slice(1), dict);
                }
            };
            // render partials
            rgx = (/\{\{#(\w+) ([^}]+?)\}\}/g);
            template = template || '';
            for (match = rgx.exec(template); match; match = rgx.exec(template)) {
                rgx.lastIndex += 1 - match[0].length;
                template = template.replace(
                    new RegExp('\\{\\{#(' + match[1] + ') (' + match[2] +
                        ')\\}\\}([\\S\\s]*?)\\{\\{/' + match[1] + ' ' + match[2] +
                        '\\}\\}'),
                    renderPartial
                );
            }
            // search for keys in the template
            return template.replace((/\{\{[^}]+?\}\}/g), function (match0) {
                getValue(match0.slice(2, -2));
                if (value === undefined) {
                    return match0;
                }
                argList.slice(1).forEach(function (arg) {
                    switch (arg) {
                    case 'decodeURIComponent':
                        value = decodeURIComponent(value);
                        break;
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = local.stringHtmlSafe(String(value));
                        break;
                    case 'jsonStringify':
                        value = JSON.stringify(value);
                        break;
                    default:
                        value = value[arg]();
                        break;
                    }
                });
                return String(value);
            });
        };
    }());



    // run shared js-env code - pre-init
/* jslint-ignore-begin */
local.templateApidoc = '\
<div class="apidocDiv">\n\
<style>\n\
/*csslint\n\
*/\n\
.apidocDiv {\n\
    background: #fff;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
}\n\
.apidocDiv a[href] {\n\
    color: #33f;\n\
    font-weight: bold;\n\
    text-decoration: none;\n\
}\n\
.apidocDiv a[href]:hover {\n\
    text-decoration: underline;\n\
}\n\
.apidocCodeCommentSpan {\n\
    background: #bbf;\n\
    color: #000;\n\
    display: block;\n\
}\n\
.apidocCodeKeywordSpan {\n\
    color: #d00;\n\
    font-weight: bold;\n\
}\n\
.apidocCodePre {\n\
    background: #eef;\n\
    border: 1px solid;\n\
    color: #777;\n\
    padding: 5px;\n\
    white-space: pre-wrap;\n\
}\n\
.apidocFooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
.apidocModuleLi {\n\
    margin-top: 10px;\n\
}\n\
.apidocSectionDiv {\n\
    border-top: 1px solid;\n\
    margin-top: 20px;\n\
}\n\
.apidocSignatureSpan {\n\
    color: #777;\n\
    font-weight: bold;\n\
}\n\
</style>\n\
<h1>api documentation\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
    >({{env.npm_package_nameAlias}} v{{env.npm_package_version}})</a>\n\
</h1>\n\
<div class="apidocSectionDiv"><a href="#"><h1>table of contents</h1></a><ul>\n\
    {{#each moduleList}}\n\
    <li class="apidocModuleLi"><a href="#{{id}}">module {{name}}</a><ol>\n\
        {{#each elementList}}\n\
        <li>\n\
            {{#if source}}\n\
            <a class="apidocElementLiA" href="#{{id}}">\n\
            {{name}}\n\
            <span class="apidocSignatureSpan">{{signature}}</span>\n\
            </a>\n\
            {{#unless source}}\n\
            <span class="apidocSignatureSpan">{{name}}</span>\n\
        {{/if source}}\n\
        </li>\n\
        {{/each elementList}}\n\
    </ol></li>\n\
    {{/each moduleList}}\n\
</ul></div>\n\
{{#each moduleList}}\n\
<div class="apidocSectionDiv">\n\
<h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n\
    {{#each elementList}}\n\
    {{#if source}}\n\
    <h2>\n\
        <a href="#{{id}}" id="{{id}}">\n\
        {{name}}\n\
        <span class="apidocSignatureSpan">{{signature}}</span>\n\
        </a>\n\
    </h2>\n\
    <ul>\n\
    <li>description and source-code<pre class="apidocCodePre">{{source}}</pre></li>\n\
    <li>example usage<pre class="apidocCodePre">{{example}}</pre></li>\n\
    </ul>\n\
    {{/if source}}\n\
    {{/each elementList}}\n\
</div>\n\
{{/each moduleList}}\n\
<div class="apidocFooterDiv">\n\
    [ this api documentation was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</div>\n\
';
/* jslint-ignore-end */



    // run shared js-env code - function
    (function () {
        local.apidocCreate = function (options) {
        /*
         * this function will create the apidoc from options.dir
         */
            var element,
                elementCreate,
                elementName,
                module,
                moduleAddConditional,
                moduleExports,
                tmp,
                trimLeft;
            elementCreate = function () {
            /*
             * this function will create the html-element
             */
                element = {};
                element.moduleName = module.name.split('.');
                // handle case where module.exports is a function
                if (element.moduleName.slice(-1)[0] === elementName) {
                    element.moduleName.pop();
                }
                element.moduleName = element.moduleName.join('.');
                element.id = encodeURIComponent('element.' + module.name + '.' + elementName);
                element.typeof = typeof module.exports[elementName];
                element.name = (element.typeof + ' <span class="apidocSignatureSpan">' +
                    element.moduleName + '.</span>' + elementName)
                    // handle case where module.exports is a function
                    .replace('>.<', '');
                if (element.typeof !== 'function') {
                    return element;
                }
                // init source
                element.source = trimLeft(module.exports[elementName].toString());
                if (element.source.length > 4096) {
                    element.source = element.source.slice(0, 4096).trimRight() + ' ...';
                }
                element.source = local.stringHtmlSafe(element.source)
                    .replace((/\([\S\s]*?\)/), function (match0) {
                        // init signature
                        element.signature = match0
                            .replace((/ *?\/\*[\S\s]*?\*\/ */g), '')
                            .replace((/,/g), ',\n');
                        return element.signature;
                    })
                    .replace(
                        (/( *?\/\*[\S\s]*?\*\/\n)/),
                        '<span class="apidocCodeCommentSpan">$1</span>'
                    )
                    .replace((/^function \(/), elementName + ' = function (');
                // init example
                element.example = 'n/a';
                module.example.replace(
                    new RegExp('((?:\n.*?){8}\\.)(' + elementName + ')(\\((?:.*?\n){8})'),
                    function (match0, match1, match2, match3) {
                        // jslint-hack
                        local.nop(match0);
                        element.example = '...' + trimLeft(local.stringHtmlSafe(match1) +
                            '<span class="apidocCodeKeywordSpan">' + match2 + '</span>' +
                            local.stringHtmlSafe(match3)).trimRight() + '\n...';
                    }
                );
                return element;
            };
            moduleAddConditional = function (prefix, name, parent) {
            /*
             * this function will conditionally add parent[name] to options.moduleDict[name]
             */
                var child;
                child = parent[name];
                if ((/\W/).test(name) ||
                        options.moduleDict[prefix + '.' + name] ||
                        options.circularList.indexOf(child) >= 0) {
                    return;
                }
                tmp = [child, child && child.prototype].some(function (dict) {
                    return dict && Object.keys(dict).some(function (key) {
                        return typeof dict[key] === 'function';
                    });
                });
                if (!tmp) {
                    return;
                }
                options.circularList.push(child);
                options.moduleDict[prefix + '.' + name] = {
                    exampleFileList: ['lib.' + name.split('.').slice(-1)[0] + '.js'],
                    exports: child
                };
                // recurse prototype
                moduleAddConditional(prefix + '.' + name, 'prototype', child);
            };
            trimLeft = function (text) {
            /*
             * this function will normalize the whitespace around the text
             */
                tmp = '';
                text.trim().replace((/^ */gm), function (match0) {
                    if (!tmp || match0.length < tmp.length) {
                        tmp = match0;
                    }
                });
                text = text.replace(new RegExp('^' + tmp, 'gm'), '');
                // enforce 128 character column limit
                while ((/^.{128}[^\\\n]/m).test(text)) {
                    text = text.replace((/^(.{128})([^\\\n]+)/gm), '$1\\\n$2');
                }
                return text;
            };
            // init options
            options = local.objectSetDefault(options, {});
            local.objectSetDefault(options, { dir: process.cwd() });
            options.dir = local.path.resolve(process.cwd(), options.dir);
            local.objectSetDefault(options, {
                packageJson: JSON.parse(local.fs.readFileSync(options.dir + '/package.json'))
            });
            local.objectSetDefault(options, { env: {
                npm_package_homepage: options.packageJson.homepage,
                npm_package_nameAlias: options.packageJson.nameAlias,
                npm_package_version: options.packageJson.version
            } }, 2);
            local.objectSetDefault(options, { env: {
                npm_package_nameAlias: options.packageJson.name
            } }, 2);
            local.objectSetDefault(options, {
                blacklistDict: { global: global },
                circularList: [global],
                exampleFileList: [
                    'README.md',
                    'test.js',
                    'test.' +  options.env.npm_package_nameAlias + '.js',
                    options.env.npm_package_main,
                    options.env.npm_package_main + '.js',
                    'index.js',
                    'lib.' +  options.env.npm_package_nameAlias + '.js'
                ],
                html: '',
                moduleDict: {}
            });
            local.objectSetDefault(options, {
                example: options.exampleFileList.map(function (file) {
                    try {
                        return '\n\n\n\n\n\n\n\n' +
                            local.fs.readFileSync(
                                local.path.resolve(options.dir, file),
                                'utf8'
                            ) +
                            '\n\n\n\n\n\n\n\n';
                    } catch (ignore) {
                    }
                }).join('')
            });
            // init moduleDict
            options.moduleDict[options.env.npm_package_nameAlias] =
                options.moduleDict[options.env.npm_package_nameAlias] ||
                { exports: require(options.dir) };
            // init circularList - builtin
            Object.keys(process.binding('natives')).forEach(function (key) {
                if (!(/\/|_linklist|sys/).test(key)) {
                    options.circularList.push(require(key));
                }
            });
            // init circularList - blacklistDict
            Object.keys(options.blacklistDict).forEach(function (key) {
                options.circularList.push(options.blacklistDict[key]);
            });
            // init circularList - moduleDict
            Object.keys(options.moduleDict).forEach(function (key) {
                options.circularList.push(options.moduleDict[key].exports);
            });
            // init moduleDict child
            ['child', 'grandchild', 'lib'].forEach(function (key) {
                if (key === 'lib') {
                    try {
                        options.libFileList = options.libFileList ||
                            local.fs.readdirSync(options.dir + '/lib')
                            .map(function (file) {
                                return 'lib/' + file;
                            });
                    } catch (ignore) {
                    }
                    (options.libFileList || []).forEach(function (file) {
                        try {
                            tmp = options.moduleDict[options.env.npm_package_nameAlias].exports;
                            tmp[file.replace((/\W/g), '_')] = tmp[file.replace((/\W/g), '_')] ||
                                require(local.path.resolve(options.dir, file));
                        } catch (ignore) {
                        }
                    });
                }
                Object.keys(options.moduleDict).forEach(function (prefix) {
                    moduleExports = options.moduleDict[prefix].exports;
                    // bug-workaround - buggy electron accessors
                    try {
                        Object.keys(moduleExports).forEach(function (name) {
                            moduleAddConditional(prefix, name, moduleExports);
                        });
                    } catch (ignore) {
                    }
                });
                // init moduleDict child.prototype
                Object.keys(options.moduleDict).forEach(function (prefix) {
                    moduleExports = options.moduleDict[prefix].exports;
                    // bug-workaround - buggy electron accessors
                    try {
                        Object.keys(moduleExports).forEach(function (name) {
                            moduleAddConditional(
                                prefix + '.' + name,
                                'prototype',
                                moduleExports[name]
                            );
                        });
                    } catch (ignore) {
                    }
                });
            });
            // init moduleDict.example
            Object.keys(options.moduleDict).forEach(function (key) {
                options.moduleDict[key].example =
                    (options.moduleDict[key].exampleFileList || [])
                    .map(function (file) {
                        try {
                            return '\n\n\n\n\n\n\n\n' +
                                local.fs.readFileSync(
                                    local.path.resolve(options.dir, file),
                                    'utf8'
                                ) +
                                '\n\n\n\n\n\n\n\n';
                        } catch (ignore) {
                        }
                    }).join('') + options.example;
            });
            // init moduleList
            options.moduleList = Object.keys(options.moduleDict)
                .sort()
                .map(function (key) {
                    module = local.objectSetDefault(options.moduleDict[key], {
                        example: '',
                        name: key
                    });
                    // handle case where module.exports is a function
                    tmp = module.exports;
                    if (typeof tmp === 'function') {
                        module.exports[module.name.split('.').slice(-1)[0]] =
                            module.exports[module.name.split('.').slice(-1)[0]] || tmp;
                    }
                    return {
                        elementList: Object.keys(module.exports)
                            .filter(function (key) {
                                try {
                                    return key && key[0] !== '_' &&
                                        !(/\W/).test(key) &&
                                        key.indexOf('testCase_') !== 0 &&
                                        module.exports[key] !== options.blacklistDict[key];
                                } catch (ignore) {
                                }
                            })
                            .map(function (key) {
                                elementName = key;
                                return elementCreate();
                            })
                            .sort(function (aa, bb) {
                                return aa.name > bb.name
                                    ? 1
                                    : -1;
                            }),
                        id: 'module.' + module.name,
                        name: module.name
                    };
                });
            return local.templateRender(local.templateApidoc, options);
        };
    }());
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        // init exports
        module.exports = module['./lib.apidoc.js'] = local;
        module.exports.__dirname = __dirname;
        // run the cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        // jslint files
        process.stdout.write(local.apidocCreate({ dir: process.argv[2] }));
        break;
    }
}());
