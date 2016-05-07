FROM buildpack-deps

# library
RUN apt-get update && apt-get install -y \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# library
RUN apt-get update
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository -y ppa:brightbox/ruby-ng
RUN apt-get -y update || true
RUN apt-get install -y git ruby rake curl wget gcc make bison libssl-dev libcurl4-openssl-dev libpcre3 libpcre3-dev cmake build-essential libyaml-dev automake python-geoip
RUN apt-get install -y ruby-dev

# mruby
WORKDIR /app/
RUN git clone https://github.com/mruby/mruby.git
COPY ./build_config.rb /app/mruby/build_config.rb
RUN cd mruby && ./minirake
RUN cd mruby && cp build/host/lib/libmruby.a build/host/lib/libmruby_core.a /usr/lib/.
RUN cd mruby && cp -r include/* /usr/include/.

# h2o
WORKDIR /
RUN git clone https://github.com/h2o/h2o \
    && cd h2o \
    && git submodule update --init --recursive \
    && cmake -DWITH_MRUBY=ON . \
    && make h2o

WORKDIR /h2o
ADD h2o.conf h2o.conf
ENTRYPOINT ["./h2o", "-c"]
CMD ["h2o.conf"]