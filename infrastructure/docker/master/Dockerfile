FROM base:latest

COPY master.sh /

ENV SPARK_MASTER_PORT 7077
ENV SPARK_MASTER_WEBUI_PORT 8080
ENV SPARK_MASTER_LOG /var/log/spark/logs

#RUN mkdir /tmp/spark-events \
#RUN /bin/bash /sbin/start-history-server.sh

CMD ["/bin/bash", "/master.sh"]


