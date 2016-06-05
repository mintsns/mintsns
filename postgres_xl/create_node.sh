#!/bin/bash

# create node
mkdir -p /usr/local/pgsql/data/data_datanode
chown postgres /usr/local/pgsql/data/data_datanode
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_datanode --nodename datanode

# mkdir -p /usr/local/pgsql/data/data_datanode_2
# chown postgres /usr/local/pgsql/data/data_datanode_2
# sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_datanode_2 --nodename datanode_2