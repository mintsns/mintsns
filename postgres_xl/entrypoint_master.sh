#!/bin/bash

echo "start entrypoint"

# create db
if [ ! -d /usr/local/pgsql/data/data_gtm ]; then
  echo "create db"
  /bin/create_master.sh
fi

# rm pid
rm -f /usr/local/pgsql/data/data_coord1/postmaster.pid

# start supervisord
echo "start supervisord"
/usr/bin/supervisord -c /etc/supervisord.conf &
sleep 10

# connect
echo "connect"
/bin/connect_master.sh

while true; do
  sleep 10
done