FROM base:latest

COPY worker.sh /

ENV SPARK_WORKER_WEBUI_PORT 8081
ENV SPARK_WORKER_LOG /var/log/spark/logs
ENV SPARK_MASTER "spark://master:7077"

CMD ["/bin/bash", "/worker.sh"]
