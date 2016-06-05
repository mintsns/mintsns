#!/bin/bash

# create directory
mkdir -p /usr/local/pgsql/data/

# gtm
mkdir -p /usr/local/pgsql/data/data_gtm
chown postgres /usr/local/pgsql/data/data_gtm
sudo -u postgres /usr/local/pgsql/bin/initgtm -D /usr/local/pgsql/data/data_gtm -Z gtm

# coord
mkdir -p /usr/local/pgsql/data/data_coord1
chown postgres /usr/local/pgsql/data/data_coord1
sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data/data_coord1 --nodename coord1

sed "s/^#listen_addresses = 'localhost'/listen_addresses = '*'/g" /usr/local/pgsql/data/data_coord1/postgresql.conf > /usr/local/pgsql/data/data_coord1/postgresql.tmp.conf
mv /usr/local/pgsql/data/data_coord1/postgresql.tmp.conf /usr/local/pgsql/data/data_coord1/postgresql.conf

echo "host all all 0.0.0.0/0 trust" >> /usr/local/pgsql/data/data_coord1/pg_hba.conf