FROM base:latest

COPY master.sh /

ENV SPARK_MASTER_PORT 7077
ENV SPARK_MASTER_WEBUI_PORT 8080
ENV SPARK_MASTER_LOG /var/log/spark/logs

RUN mkdir -p /tmp/spark-events
        && ./sbin/start-history-server.sh

EXPOSE 8080 7077 6066

CMD ["/bin/bash", "/master.sh"]


