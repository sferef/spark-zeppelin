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

#RUN yum install -y java-11-openjdk-devel
RUN yum install -y java-1.8.0-openjdk

RUN update-ca-trust enable \
        && yum install -y initscripts

RUN echo "root:pwd" | chpasswd \
        && sed -i "/PermitRootLogin without-password/s/^/#/" /etc/ssh/sshd_config \
        && echo "PermitRootLogin yes" >> /etc/ssh/sshd_config \
        && ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa \
        && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys \
        && chmod 0600 ~/.ssh/authorized_keys \
        && echo "    StrictHostKeyChecking no" >> /etc/ssh/ssh_config

# Scala installation
RUN cd /opt \
        && wget --no-verbose https://downloads.lightbend.com/scala/${SCALA_VERSION}/scala-${SCALA_VERSION}.tgz \
        && tar xzf "scala-${SCALA_VERSION}.tgz" \
        && ln -sf /opt/scala-${SCALA_VERSION} ${SCALA_HOME} \
        && ln -sf "/opt/scala-${SCALA_VERSION}/bin/"* "/usr/bin/"

# Spark installation
RUN cd /opt \
        && wget --no-verbose http://apache.mirror.iphh.net/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
        && tar xzf "spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz" \
        && ln -sf /opt/spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION} ${SPARK_HOME} \
        && ln -sf "/opt/spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}/bin/"* "/usr/bin/" \
        && rm -f /opt/*.tgz \
        && mkdir -p /var/log/spark/logs

RUN export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")

CMD ["/usr/sbin/init"]