# MintSNS

## OverView

SNS to make with everyone!

## Setup

### Install the `node` and `npm` to your development environment

Download URL: https://nodejs.org/en/

```
sudo chown -R <username>:staff /usr/local/lib/node_modules
```

### Install the npm packages

```
npm install
```

### Install the `docker-machine` to your development environment

Download URL: https://www.docker.com/products/docker-toolbox

## Docker

```
bash pre_download.sh
docker-machine             create \
    --driver               virtualbox \
    --virtualbox-memory    4096 \
    --virtualbox-disk-size 20000 \
    dev
docker-machine start dev2
eval $(docker-machine env dev2)
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
docker-compose exec web /usr/local/bin/python manage.py migrate
docker-compose exec web /usr/local/bin/python manage.py makemigrations mintsns
docker-compose exec web /usr/local/bin/python manage.py migrate
```

### Create the super user
```
docker-compose exec web /usr/local/bin/python manage.py createsuperuser
```

### FIXME: next

## Features

FIXME: write

## Git book

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

## Frontend

### build
```
cd frontend
npm run build 
```

### watch
```
cd frontend
npm run watch
```


## Reference URL
* [Django REST framework](http://www.django-rest-framework.org/)
* [Django Development With Docker Compose and Machine](https://realpython.com/blog/python/django-development-with-docker-compose-and-machine/)

## Features
TODO: write

## Contributing
We are looking for now developed members. We are carrying out activities on the Google Hangouts, please message <nacika.inscatolare@gmail.com>
