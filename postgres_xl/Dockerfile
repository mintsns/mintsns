FROM debian:jessie
RUN apt-get update
RUN apt-get install -y sudo supervisor make apt-utils unzip wget gcc bison flex libreadline6 libreadline6-dev zlib1g zlib1g-dev
WORKDIR /usr/local/src

# build
ARG postgres_xl_src=postgres-xl-9.5r1.1
RUN wget http://files.postgres-xl.org/${postgres_xl_src}.tar.gz
RUN mv ${postgres_xl_src}.tar.gz postgres-xl.tar.gz
RUN ls -lha
RUN tar xzvf postgres-xl.tar.gz
WORKDIR ${postgres_xl_src}
RUN ./configure
RUN make
RUN mkdir -p /usr/local/pgsql/

RUN make install

# add user
RUN yes | adduser postgres

# start server
USER root
WORKDIR /usr/local/src
COPY create_db.sh /bin/create_db.sh
RUN chmod +x /bin/create_db.sh
WORKDIR /opt/supervisord
COPY supervisord.conf /etc/supervisord.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# DB初期化
# docker-compose exec postgres_xl /bin/create_db.sh