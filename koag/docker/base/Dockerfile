# 第一次时构建基础镜像
FROM node:6-alpine
MAINTAINER Sam<explnwind@gmail.com>

WORKDIR /apps/koag
COPY . .

RUN npm install --production \
		--build-from-source \
		--registry=http://registry.cnpmjs.org \
		--disturl=https://npm.taobao.org/mirrors/node &&\
		npm cache clean

EXPOSE 8001 80
CMD ["npm","start"]
