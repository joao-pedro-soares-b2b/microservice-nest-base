#!/bin/bash

PROTO_DIR="./src/infrastructure/grpc"

if ! command -v protoc &> /dev/null; then
    echo "protoc could not be found, please install it."
    exit 1
fi

NPM_PACKAGE="protoc-gen-js"

if ! npm list -g | grep $NPM_PACKAGE > /dev/null; then
    echo "$NPM_PACKAGE is not installed. Installing..."
    npm install -g $NPM_PACKAGE
fi

if [ -d "$PROTO_DIR" ] && ls $PROTO_DIR/*.proto 1> /dev/null 2>&1; then
  for file in $PROTO_DIR/*.proto; do
    if [ -f "$file" ]; then
      echo "Compiling $file..."
      protoc --proto_path=$PROTO_DIR --js_out=import_style=commonjs,binary:$PROTO_DIR $file
    fi
  done
  echo "Compilation done."
else
  echo "No .proto files found in $PROTO_DIR."
fi
