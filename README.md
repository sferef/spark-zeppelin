# spark-zeppelin

The following repo contains a solution dockerized (spark cluster and Zeppelin).  

## Getting Started

This demo aims to prove in different levels (configuration local, configuration distributed) the functionality of tool Zeppelin in interaction with a Spark cluster in docker.

## Prerequisites

You need to have installed:

* 8GB Ram minimum
* [docker](https://www.docker.com/products/docker-desktop) (latest version)

## Compatibility

| Tool              | Version | Compatibility |
|-------------------|---------|---------------|
| Spark-with-hadoop | 2.4.0   |       ✔       |
| Hadoop            | 2.7.0   |       ✔       |
| Scala             | 2.12.14 |       ✔       |
| Zeppelin          | 0.9.0   |       ✔       |

## infrastructure 

In the repository, by default, you have a folder named `infrastructure', which contains all docker solutions.
We choose a centos8 image as the base for our project.

```shell
infrastructure 
    |
    |__/apps (it is a mapping between your local file-system and container file-system)
    |__/data (it is a mapping between your local file-system and container file-system)
    |__/docker 
          |___/base (Centos8 image + (java 1.8 + scala 2.12.14 + spark 2.4.0))
          |___/master (Spark Master image over base image)
          |___/worker (Spark Worker image over base image)
          |___/zeppelin (Zeppelin installation over base image)
    |__/build_images.sh (script to build all image)
    |__/clean.sh (script to delete all containers in background)
    |__/docker-compose.yml (contains all configuration for each container to run in distributed mode)
    |__/single-mode-zeppelin.yml (run zeppelin in local mode)      
```

## Installation

1. Clone the project
```shell

git clone git@github.com:sferef/spark-zeppelin.git

git checkout master
```

2. Build all images - (take 15 mins)
```shell
cd spark-zeppelin/infrastructure

chmod 755 build_images.sh

./build_images.sh
```


## Run infrastructure

1. Start infrastructure 
```shell

cd spark-zeppelin/infrastructure
 
docker compose up -d

```

2. Check status 
```shell
docker ps

CONTAINER ID   IMAGE                   COMMAND                  CREATED         STATUS         PORTS                      NAMES
9ab098f3a7f9   apache/zeppelin:0.9.0   "/usr/bin/tini -- bi…"   2 minutes ago   Up 2 minutes   0.0.0.0:1987->8080/tcp...  zeppelin
9283b0482dc4   spark-worker:latest     "/bin/bash /worker.sh"   3 hours ago     Up 3 hours     8081/tcp                   infrastructure_worker_1
01dd9b905536   spark-master:latest     "/bin/bash /master.sh"   3 hours ago     Up 3 hours     0.0.0.0:4040->4040/tcp...  master
```
## Stop infrastructure

1. Stop infrastructure 
```shell
docker compose down
```

## Scale workers 

1. Once all container are up, you can scale up to 3 workers in the following way:
```shell
docker-compose scale worker=3
```

2. Recommendable check the containers running 
```shell
docker ps 
docker ps -a  # containers in background  
```

3. To scale down, run:
```shell
docker-compose scale worker=1
```

## Spark

We can run a spark job in different ways, through submiting a fat-jar file into infrastructure or
through zeppelin.

### Using mapping folder (apps and data):

**Running a spark job in client mode**:

```shell
/opt/spark/bin/spark-submit \
--class org.apache.spark.examples.SparkPi \
--master spark://master:7077 \
--deploy-mode client \
--total-executor-cores 2 \
/opt/spark/examples/jars/spark-examples_2.12-3.1.2.jar 200
```

**Monitorization**:
* http://localhost:4040
* http://localhost:8080
* http://localhost:8081 

### Using Zeppelin

1. Execute Zeppelin daemon (manual)

```shell
  docker exec -it zeppelin /bin/bash 
  /opt/zeppelin-0.9.0-bin-all/bin/zeppelin-daemon.sh start
```

2. Configure your spark interpreter go to http://localhost:9010

* select the deploy mode (client/cluster)
* select the app name (zeppelin)


### Run Zeppelin in local mode

1. Up the zeppelin container
```shell
docker-compose -f single-mode-zeppelin.yml up -d                                     [  OK  ]
```

2. Up the daemon

```shell
docker exec -it zeppelin /bin/bash 
[root@zeppelin]# /opt/zeppelin-0.9.0-bin-all/bin/zeppelin-daemon.sh start
Zeppelin start                                              [  OK  ]      
```

* Restart
```shell
[root@zeppelin]# /opt/zeppelin-0.9.0-bin-all/bin/zeppelin-daemon.sh restart
Zeppelin stop                                              [  OK  ]
Zeppelin start                                             [  OK  ]
```


## Helper Docker

**Remove <None> images**:
```shell
  docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```

**Issues making docker-compose**:
```check permission must be 755 for each script in infrastructure```

**Zeppelin doest not work**

```shell
docker exec -it /bin/bash 
/opt/zeppelin-0.9.0-bin-all/bin/zeppelin-daemon.sh start
```

**Docker-compose down does not work**

Execute script:
```shell
./clean.sh
```