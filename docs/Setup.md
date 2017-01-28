# Setup

## 1. Node

### Install the `node` and `npm` to your development environment

Download URL: https://nodejs.org/en/

```
sudo chown -R <username>:staff /usr/local/lib/node_modules
```

### Install yarn

```
brew install yarn
```

## 2. Docker

### Install the `docker-machine` to your development environment

Download URL: https://www.docker.com/products/docker-toolbox

(or [Docker for Mac](https://blog.docker.com/2016/03/docker-for-mac-windows-beta/) )

```
bash pre_download.sh
```
```
docker-machine             create \
    --driver               virtualbox \
    --virtualbox-memory    4096 \
    --virtualbox-disk-size 20000 \
    dev
```
```
docker-machine start dev
eval $(docker-machine env dev)
```
```
docker ps
docker-compose build
docker-compose up
```

### Rebuild
```
docker-compose stop
docker-compose build
docker-compose up
```

### Migrate
```
docker-compose exec web /usr/local/bin/python manage.py makemigrations && \
docker-compose exec web /usr/local/bin/python manage.py makemigrations mintsns  && \
docker-compose exec web /usr/local/bin/python manage.py migrate
```

### Create the super user
```
docker-compose exec web /usr/local/bin/python manage.py createsuperuser
```

## 3. Git book

### Install
```
npm install -g gitbook-cli(or -> sudo npm install -g gitbook-cli)
cd docs
```

### Build
```
cd docs
gitbook build
```

### serve
```
cd docs
gitbook serve
```

## 4. Frontend

### install npm packages
```
cd frontend
yarn install
```

### build
```
cd frontend
yarn run build 
```

### watch
```
cd frontend
yarn run watch
```
