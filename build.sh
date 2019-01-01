#!/usr/bin/env bash

rm -rf dist
$(npm bin)/ngc -p lib/tsconfig-es6.json
$(npm bin)/webpack --config ./lib/webpack.config.js