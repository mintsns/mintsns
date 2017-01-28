#!/bin/bash

# create db
if [ ! -d /usr/local/pgsql/data/data_gtm ]; then
  /bin/create_master.sh
fi

# connect 
/bin/connect_master.sh &

# start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf
