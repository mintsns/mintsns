#!/bin/bash

is_loop=true
while $is_loop; do
  echo "connect_node --> 接続待機中..."
  is_connect=$(sudo -u postgres /usr/local/pgsql/bin/psql -c "select 1;" postgres | head -n 3 | tail -n 1 | tr -d '[[:space:]]')
  if [ $is_connect ]; then
    is_loop=false
    echo "connect_node --> 接続完了..."
  fi
  sleep 1
done

echo "connect_node --> 3秒待機..."
sleep 3

echo "connect_node --> ノード作成開始(master)"

# drop node
echo "connect_node --> [A]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "DROP NODE datanode" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1;" postgres

# create node ( coord1 -> node1 )
echo "connect_node --> [B]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "CREATE NODE datanode WITH (TYPE = 'datanode', HOST = 'postgres_xl_node', PORT = 5432)" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# datanode
echo "connect_node --> [C]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = ''postgres_xl_node'', PORT = 5432)'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# coord1
echo "connect_node --> [D]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'CREATE NODE coord1 WITH (TYPE = ''coordinator'', HOST = ''postgres_xl'', PORT = 5432)'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# pgxc_pool_reload
echo "connect_node --> [E]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "SELECT pgxc_pool_reload()" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# pgxc_pool_reload
echo "connect_node --> [F]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT pgxc_pool_reload()" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# pgxc_pool_reload
echo "connect_node --> [G]"
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT pgxc_pool_reload()'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl -c "EXECUTE DIRECT ON (datanode) 'SELECT 1'" postgres
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT 1" postgres

# echo "connect_node --> ノード作成開始(node)"

# # alter node
# sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# # create node ( coord1 -> node1 )
# sudo -u postgres  /usr/local/pgsql/bin/psql -h postgres_xl_node -c "CREATE NODE datanode WITH (TYPE = 'datanode', HOST = postgres_xl_node, PORT = 5432)" postgres

# # datanode
# sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'ALTER NODE datanode WITH (TYPE = ''datanode'', HOST = postgres_xl_node, PORT = 5432)'" postgres

# # coord1
# sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'CREATE NODE coord1 WITH (TYPE = ''coordinator'', HOST = postgres_xl, PORT = 5432)'" postgres

# # pgxc_pool_reload
# sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "SELECT pgxc_pool_reload()" postgres
# sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl_node -c "EXECUTE DIRECT ON (datanode) 'SELECT pgxc_pool_reload()'" postgres


echo "connect_node --> ノード作成完了"