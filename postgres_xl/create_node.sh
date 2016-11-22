#!/bin/bash

# create node
mkdir -p /usr/local/pgsql/data/

# gtm
mkdir -p /usr/local/pgsql/data/data_gtm
chown postgres /usr/local/pgsql/data/data_gtm
sudo -u postgres /usr/local/pgsql/bin/initgtm -D /usr/local/pgsql/data/data_gtm -Z gtm

# data node
mkdir -p /usr/local/pgsql/data/data_datanode
chown postgres /usr/local/pgsql/data/data_datanode
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_datanode --nodename datanode

sed "s/^#listen_addresses = 'localhost'/listen_addresses = '*'/g" /usr/local/pgsql/data/data_datanode/postgresql.conf > /usr/local/pgsql/data/data_datanode/postgresql.tmp.conf
mv /usr/local/pgsql/data/data_datanode/postgresql.tmp.conf /usr/local/pgsql/data/data_datanode/postgresql.conf

echo "host all all 0.0.0.0/0 trust" >> /usr/local/pgsql/data/data_datanode/pg_hba.conf