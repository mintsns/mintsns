#!/bin/bash

# create directory
mkdir -p /usr/local/pgsql/data/
mkdir -p /usr/local/pgsql/data/data_coord1
mkdir -p /usr/local/pgsql/data/data_datanode_1
mkdir -p /usr/local/pgsql/data/data_datanode_2
mkdir -p /usr/local/pgsql/data/data_gtm

# change permission
chown postgres /usr/local/pgsql/data/data_coord1
chown postgres /usr/local/pgsql/data/data_datanode_1
chown postgres /usr/local/pgsql/data/data_datanode_2
chown postgres /usr/local/pgsql/data/data_gtm

# create db
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_coord1 --nodename coord1
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_datanode_1 --nodename datanode_1
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_datanode_2 --nodename datanode_2
sudo -u postgres /usr/local/pgsql/bin/initgtm -D /usr/local/pgsql/data/data_gtm -Z gtm