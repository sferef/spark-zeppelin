#!/bin/bash

set -e

nohup /opt/spark/bin/spark-class org.apache.spark.deploy.master.Master -h master --ip zeppelin --port 7077 & >> /opt/spark/logs/master.out
nohup /opt/spark/bin/spark-class org.apache.spark.deploy.worker.Worker & >> /opt/spark/logs/worker.out