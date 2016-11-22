# postgres-xl docker

## sql
```
docker-compose exec postgres_xl /bin/bash
sudo -u postgres /usr/local/pgsql/bin/psql -h postgres_xl
```

## createdb
```
docker-compose exec postgres_xl /bin/bash
sudo -u postgres /usr/local/pgsql/bin/createdb test
```

## start master
```
docker-compose kill postgres_xl && docker-compose build postgres_xl && docker-compose up postgres_xl
```

## start node
```
rm -rf data/postgresql_xl_node;  docker-compose kill postgres_xl_node && docker-compose build postgres_xl_node && docker-compose up postgres_xl_node
```