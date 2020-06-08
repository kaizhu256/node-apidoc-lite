# example.sh

# this shell script will auto-generate documentation for the mysql npm-package with zero-config

# 1. npm install apidoc-lite
npm install apidoc-lite --prefix .
# 2. npm install mysql
npm install mysql
# 3. auto-generate documentation for the mysql npm-package with zero-config
./node_modules/.bin/apidoc-lite mysql > /tmp/apidoc.html
# 4. open /tmp/apidoc.html to view the auto-generated mysql documentation
