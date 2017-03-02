apidoc-lite
===========
this zero-dependency package will auto-generate documentation for your npm-package with zero-config

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-apidoc-lite.svg)](https://travis-ci.org/kaizhu256/node-apidoc-lite) [![istanbul-coverage](https://kaizhu256.github.io/node-apidoc-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/apidoc-lite.png?downloads=true)](https://www.npmjs.com/package/apidoc-lite)

[![package-listing](https://kaizhu256.github.io/node-apidoc-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-apidoc-lite)



# cdn download
- [https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/app/assets.apidoc.rollup.js](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/app/assets.apidoc.rollup.js)



# documentation
#### apidoc
- [https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-apidoc-lite/build/screen-capture.apidoc.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-apidoc-lite_2Ftmp_2Fbuild_2Fapidoc.html.png)](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- none

#### change since 9fe8c225
- npm publish 2017.2.27
- successful travis-ci build
- none

#### this package requires
- darwin or linux os



# build status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-apidoc-lite.svg)](https://travis-ci.org/kaizhu256/node-apidoc-lite)
[![build commit status](https://kaizhu256.github.io/node-apidoc-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-apidoc-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-apidoc-lite/tree/master) | [beta](https://github.com/kaizhu256/node-apidoc-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-apidoc-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-apidoc-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-apidoc-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-coverage](https://kaizhu256.github.io/node-apidoc-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-apidoc-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-apidoc-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-apidoc-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-apidoc-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-apidoc-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-apidoc-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-apidoc-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-apidoc-lite/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart shell example
#### to run this example, follow the instruction in the script below
- [example.sh](https://kaizhu256.github.io/node-apidoc-lite/build..beta..travis-ci.org/example.sh)
```shell
# example.sh

# this shell script will auto-generate documentation for the mysql npm-package with zero-config

# instruction
    # 1. copy and paste this entire shell script into a console and press enter
    # 2. open /tmp/apidoc.html to view the auto-generated documentation

shExampleSh() {(set -e
    # npm install apidoc-lite
    npm install apidoc-lite
    # npm install mysql
    npm install mysql
    # auto-generate documentation for the mysql npm-package with zero-config
    node_modules/.bin/apidoc-lite node_modules/mysql > /tmp/apidoc.html
)}
shExampleSh
```

#### output from browser
![screen-capture](https://kaizhu256.github.io/node-apidoc-lite/build/screen-capture.testExampleSh.browser._2Ftmp_2Fapidoc.html.png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-apidoc-lite/build/screen-capture.testExampleSh.svg)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "apidoc-lite": "lib.apidoc.js"
    },
    "description": "this zero-dependency package will auto-generate documentation for your npm-package with zero-config",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=4.0"
    },
    "homepage": "https://github.com/kaizhu256/node-apidoc-lite",
    "keywords": [
        "api-doc",
        "apidoc",
        "doc",
        "documentation",
        "doxygen",
        "javadoc"
    ],
    "license": "MIT",
    "main": "lib.apidoc.js",
    "name": "apidoc-lite",
    "nameAlias": "apidoc",
    "nameOriginal": "apidoc-lite",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-apidoc-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shReadmeBuild",
        "deploy-github": "true",
        "deploy-heroku": "true",
        "env": "env",
        "heroku-postbuild": "npm install 'kaizhu256/node-utility2#alpha' && utility2 shDeployHeroku",
        "postinstall": "if [ -f lib.apidoc.npm-scripts.sh ]; then ./lib.apidoc.npm-scripts.sh postinstall; fi",
        "publish-alias": "VERSION=$(npm info $npm_package_name version); for ALIAS in api_doc apidocs api-doctor doctor-api npm-doc npmdoc; do utility2 shNpmPublishAs . $ALIAS $VERSION; utility2 shNpmTestPublished $ALIAS || exit $?; done",
        "start": "export PORT=${PORT:-8080} && export npm_config_mode_auto_restart=1 && utility2 start",
        "test": "export PORT=$(utility2 shServerPortRandom) && utility2 test test.js",
        "test-example-js": "true",
        "test-example-sh": "utility2 shReadmeTestExampleSh",
        "test-pre": "true",
        "test-published": "utility2 shNpmTestPublished"
    },
    "version": "2017.2.27"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-apidoc-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-apidoc-lite/commits)



# internal build-script
- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuild() {(set -e
# this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=20
    case "$CI_BRANCH" in
    alpha)
        shBuildCiDefault
        ;;
    beta)
        shBuildCiDefault
        ;;
    master)
        shBuildCiDefault
        git tag "$npm_package_version" || true
        git push "git@github.com:$GITHUB_REPO.git" "$npm_package_version" || true
        ;;
    publish)
        printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
        export CI_BRANCH=alpha
        shNpmPublishAs
        shBuildCiDefault
        npm run publish-alias
        git push "git@github.com:$GITHUB_REPO.git" publish:beta
        ;;
    esac
)}

shBuild
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
