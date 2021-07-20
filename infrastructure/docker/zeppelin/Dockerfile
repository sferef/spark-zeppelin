FROM base:latest

ENV ZEPPELIN_VERSION=0.9.0

RUN cd /opt \
        && wget --no-verbose https://downloads.apache.org/zeppelin/zeppelin-${ZEPPELIN_VERSION}/zeppelin-${ZEPPELIN_VERSION}-bin-all.tgz \
        && tar xzf "zeppelin-${ZEPPELIN_VERSION}-bin-all.tgz"

# ADD zeppelin-0.9.0-bin-all /opt/zeppelin-${ZEPPELIN_VERSION}-bin-all
ENV ZEPPELIN_HOME=/opt/zeppelin-${ZEPPELIN_VERSION}-bin-all

RUN export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")

RUN mkdir -p /opt/zeppelin-${ZEPPELIN_VERSION}-bin-all/logs \
        && mkdir -p /opt/zeppelin-${ZEPPELIN_VERSION}-bin-all/run

RUN yum install -y npm

EXPOSE 9010

CMD ["/usr/sbin/init"]
