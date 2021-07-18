#!/bin/bash

set -e

docker rm -f $(docker ps -a -q)
#docker rmi $(docker images --filter "dangling=true" -q --no-trunc)