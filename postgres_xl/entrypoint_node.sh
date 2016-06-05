#!/bin/bash

# create db
if [ ! -d /usr/local/pgsql/data/data_datanode ]; then
  /bin/create_node.sh
fi

# connect 
/bin/connect_node.sh &

# start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf