#!/bin/bash

set -e

docker build -t base:latest ./docker/base/
docker build -t spark-worker:latest ./docker/worker/
docker build -t spark-master:latest ./docker/master/