# 第N次时构建时，基于基础镜像
# FROM node:6-alpine
FROM yourRegistry.com/koag:base
MAINTAINER Sam<explnwind@gmail.com>

WORKDIR /apps/koag
RUN mv ./node_modules ../ &&\
		rm -rf * &&\
		mv ../node_modules ./

ADD . .

RUN npm install --production \
		--build-from-source \
		--registry=http://registry.cnpmjs.org \
		--disturl=https://npm.taobao.org/mirrors/node &&\
		npm cache clean

EXPOSE 8001 80
CMD ["npm","start"]
