# postgres-xl docker


## sql
```
docker-compose exec postgres_xl /bin/bash
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl
```

## start master
```
docker-compose kill postgres_xl ; rm -rf data/postgresql_xl ; docker-compose up --build postgres_xl
```

## start node
```
docker-compose kill postgres_xl_node ; rm -rf data/postgresql_xl_node ; docker-compose up --build postgres_xl_node
```

## create cluster test db(クラスタリングできているかの確認ができる)
```
docker-compose exec postgres_xl /bin/bash
sudo -u postgres /usr/local/pgsql/bin/createdb test
```

## config
```
vim /usr/local/pgsql/data/data_coord1/postgresql.conf
```