#!/bin/bash
CONTAINER_ID=$(docker run -P -d --name mintsns-web mintsns) && SSH_PORT=$(docker port $CONTAINER_ID 22 | cut -d: -f2) && SSH_HOST=$(docker port $CONTAINER_ID 22 | cut -d: -f1)
docker cp $CONTAINER_ID:/root/.ssh/id_rsa $CONTAINER_ID
