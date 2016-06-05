# create db
if [ $(ls -1 /usr/local/pgsql/data/data_datanode | wc -l) -ge 1 ]; then
  bash /bin/create_node.sh
fi

# connect 
/bin/connect_node.sh &

# start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf