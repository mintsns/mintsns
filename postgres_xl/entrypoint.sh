# create db
if [ $(ls -1 /usr/local/pgsql/data/ | wc -l) -ge 4 ]; then
  bash /bin/create_db.sh
fi

# create node
/bin/create_node.sh &

# start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf