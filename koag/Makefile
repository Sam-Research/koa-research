##########################
# docker images
##########################
TAG=v0.0.1
DEFAULT_TAG=latest
ENV=prod
REGISTRY=yourRegistry.com
NAME=mis
IMAGE=$(REGISTRY)/$(NAME):$(DEFAULT_TAG)
BASE_IMAGE=$(REGISTRY)/$(NAME):base

# Dockerfile
cp_DockerCompose:
	cp ./docker/${ENV}.yml ./docker-compose.yml

cp_Dockerfile:
	cp ./docker/${ENV}/Dockerfile ./Dockerfile

build: cp_Dockerfile
	docker build -t $(IMAGE) .

buildtag:
	cp ./docker/base/Dockerfile ./Dockerfile
	docker build -t $(BASE_IMAGE) .
	docker push $(BASE_IMAGE)

tag:
	docker tag $(IMAGE) $(REGISTRY)/$(NAME):$(TAG)

push:
	docker push $(IMAGE)

push-Tag:
	docker push $(REGISTRY)/$(NAME):$(TAG)

BTB: buildtag
BTPP: build tag push push-Tag

BTP: build tag push-Tag


test:
	. /usr/local/opt/nvm/nvm.sh && \
	nvm use v6.9.1 && \
	npm test

.PHONY: test
