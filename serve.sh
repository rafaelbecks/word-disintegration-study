#!/bin/bash

source ../emsdk/emsdk_env.sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR && cp ../potrace-wasm/index.js . && emrun .
