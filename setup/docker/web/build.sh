#!/bin/bash
docker rmi mintsns:latest
docker build -t mintsns:latest .
