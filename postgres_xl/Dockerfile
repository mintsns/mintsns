FROM debian:jessie
RUN apt-get update
RUN apt-get install -y vim net-tools lsof postgresql-client sudo supervisor make apt-utils unzip wget gcc bison flex libreadline6 libreadline6-dev zlib1g zlib1g-dev
WORKDIR /usr/local/src

# mode(master|node)
ARG mode

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

# copy
WORKDIR /usr/local/src
USER root

# copy
COPY supervisord_${mode}.conf /etc/supervisord.conf
COPY create_${mode}.sh /bin/create_${mode}.sh
COPY connect_${mode}.sh /bin/connect_${mode}.sh 
COPY entrypoint_${mode}.sh /bin/entrypoint.sh

# chmod
RUN chmod +x /bin/create_${mode}.sh
RUN chmod +x /bin/connect_${mode}.sh
RUN chmod +x /bin/entrypoint.sh

RUN echo $mode

# start server
WORKDIR /opt/supervisord
CMD ["/bin/bash"]
ENTRYPOINT /bin/entrypoint.sh
