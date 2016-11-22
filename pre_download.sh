#!/bin/bash

mkdir tmp
pushd tmp

if [ $(uname) = Darwin ]; then

  if [ ! -f protoc-3.0.0-beta-2-linux-x86_64.zip ]; then

    curl -L -O https://github.com/google/protobuf/releases/download/v3.0.0-beta-2/protoc-3.0.0-beta-2-linux-x86_64.zip
    unzip protoc-3.0.0-beta-2-linux-x86_64.zip

    curl -L -O https://github.com/google/protobuf/releases/download/v3.0.0-beta-2/protobuf-python-3.0.0-beta-2.tar.gz
    tar xzvf protobuf-python-3.0.0-beta-2.tar.gz

    curl -L -O https://github.com/grpc/grpc/archive/release-0_12_0.zip
    unzip release-0_12_0.zip

    curl -L -O https://github.com/grpc/grpc/archive/release-0_13_1.zip
    unzip release-0_13_1.zip

  fi

else

  if [ ! -f protoc-3.0.0-beta-2-linux-x86_64.zip ]; then
      wget https://github.com/google/protobuf/releases/download/v3.0.0-beta-2/protoc-3.0.0-beta-2-linux-x86_64.zip
      unzip protoc-3.0.0-beta-2-linux-x86_64.zip

      wget https://github.com/google/protobuf/releases/download/v3.0.0-beta-2/protobuf-python-3.0.0-beta-2.tar.gz
      tar xzvf protobuf-python-3.0.0-beta-2.tar.gz

      wget https://github.com/grpc/grpc/archive/release-0_12_0.zip
      unzip release-0_12_0.zip

      wget https://github.com/grpc/grpc/archive/release-0_13_1.zip
      unzip release-0_13_1.zip
  fi

fi



popd