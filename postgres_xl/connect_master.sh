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


echo "create_node --> ノード作成開始"

# alter node coordinator
sudo -u postgres  /usr/local/pgsql/bin/psql -c "ALTER NODE coord1 WITH (TYPE = 'coordinator', PORT = 5432)" postgres

# test
sudo -u postgres /usr/local/pgsql/bin/psql -c "SELECT pgxc_pool_reload()" postgres

echo "create_node --> ノード作成完了"