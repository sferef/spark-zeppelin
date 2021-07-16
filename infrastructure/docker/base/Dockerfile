FROM centos:centos8
LABEL author="Luis Kevin Huaman Bolanger" email="lk.huaman@gmail.com"
LABEL version="0.1"

ENV SPARK_VERSION=3.1.2
ENV HADOOP_VERSION=2.7
ENV SCALA_VERSION=2.12.14

ENV SCALA_HOME=/opt/scala
ENV SPARK_HOME=/opt/spark

RUN yum update -y \
        && yum install -y systemd \
        && yum install -y vim lrzsz wget gcc-c++ \
        && yum install -y pcre pcre-devel \
        && yum install -y zlib zlib-devel ruby \
        && yum install -y openssl openssl-devel \
        && yum install -y patch bash-completion \
        && yum install -y zlib.i686 libstdc++.i686 \
        && yum install -y lsof unzip zip net-tools \
        && yum -y clean all \
        && yum install -y openssh openssh-server openssh-clients

RUN yum install -y java-11-openjdk-devel

RUN update-ca-trust enable \
        && yum install -y initscripts

RUN echo "root:pwd" | chpasswd \
        && sed -i "/PermitRootLogin without-password/s/^/#/" /etc/ssh/sshd_config \
        && echo "PermitRootLogin yes" >> /etc/ssh/sshd_config \
        && ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa \
        && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys \
        && chmod 0600 ~/.ssh/authorized_keys \
        && echo "    StrictHostKeyChecking no" >> /etc/ssh/ssh_config


CMD ["/usr/sbin/init"]


