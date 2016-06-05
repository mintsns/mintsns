#!/bin/bash

is_loop=true
while $is_loop; do
  echo "create_node --> 接続待機中..."
  is_connect=$(sudo -u postgres /usr/local/pgsql/bin/psql -c "select 1;" postgres | head -n 3 | tail -n 1 | tr -d '[[:space:]]')
  if [ $is_connect ]; then
    is_loop=false
    echo "create_node --> 接続完了..."
  fi
  sleep 1
done


echo "create_node --> ノード作成開始(master)"

# alter node
sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# create node ( coord1 -> node1 )
sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl -c "CREATE NODE datanode WITH (TYPE = 'datanode', HOST = postgres_xl_node, PORT = 5432)" postgres

# datanode
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# coord1
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'CREATE NODE coord1 WITH (TYPE = ''coordinator'', HOST = postgres_xl, PORT = 5432)'" postgres

# pgxc_pool_reload
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "SELECT pgxc_pool_reload()" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT pgxc_pool_reload()'" postgres

echo "create_node --> ノード作成開始(node)"

# alter node
sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# create node ( coord1 -> node1 )
sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl_node -c "CREATE NODE datanode WITH (TYPE = 'datanode', HOST = postgres_xl_node, PORT = 5432)" postgres

# datanode
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# coord1
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'CREATE NODE coord1 WITH (TYPE = ''coordinator'', HOST = postgres_xl, PORT = 5432)'" postgres

# pgxc_pool_reload
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT pgxc_pool_reload()" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'SELECT pgxc_pool_reload()'" postgres



sudo -u postgres /usr/local/pgsql/bin/createdb test


echo "create_node --> ノード作成完了"