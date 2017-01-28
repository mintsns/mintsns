#!/bin/bash

echo "start entrypoint"

# create db
if [ ! -d /usr/local/pgsql/data/data_datanode ]; then
  echo "create db"
  /bin/create_node.sh
fi

# start supervisord
echo "start supervisord"
/usr/bin/supervisord -c /etc/supervisord.conf &

sleep 10

# connect
echo "connect node"
/bin/connect_node.sh &

while true; do
  sleep 10
done