#!/bin/bash

is_loop=true
while $is_loop; do
  echo "connect_master --> 接続待機中..."
  is_connect=$(sudo -u postgres /usr/local/pgsql/bin/psql -c "select 1;" postgres | head -n 3 | tail -n 1 | tr -d '[[:space:]]')
  if [ $is_connect ]; then
    is_loop=false
    echo "connect_master --> 接続完了..."
  fi
  sleep 1
done

echo "connect_master --> 3秒待機..."
sleep 3


echo "connect_master --> ノード作成開始"

# alter node coordinator
echo "connect_master --> [A]"
sudo -u postgres  /usr/local/pgsql/bin/psql -c "ALTER NODE coord1 WITH (TYPE = 'coordinator', PORT = 5432)" postgres

# test
echo "connect_master --> [B]"
sudo -u postgres /usr/local/pgsql/bin/psql -c "SELECT pgxc_pool_reload()" postgres

echo "connect_master --> ノード作成完了"