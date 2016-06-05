#!/bin/bash

# create directory
mkdir -p /usr/local/pgsql/data/
mkdir -p /usr/local/pgsql/data/data_coord1
mkdir -p /usr/local/pgsql/data/data_gtm
chown postgres /usr/local/pgsql/data/data_coord1
chown postgres /usr/local/pgsql/data/data_gtm
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_coord1 --nodename coord1
sudo -u postgres /usr/local/pgsql/bin/initgtm -D /usr/local/pgsql/data/data_gtm -Z gtm




