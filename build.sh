#!/usr/bin/env bash

# rm -rf dist
$(npm bin)/ngc -p build/tsconfig-es6.json
$(npm bin)/webpack --config build/webpack.config.js
$(npm bin)/webpack --config build/webpack-scss.config.js
cp README.md dist/lib
node build/gen-pacakge.js