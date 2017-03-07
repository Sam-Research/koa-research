##  koag 微服务脚手架

### feature
- koa: 原生 koa, router, http
- logger: 稍稍封装 winston 作为日志记录，收集配合 elk 更佳
- docker: 支持 docker 打包，配合 jenkins 更佳
- process manage: 直接 copy 阿里工程师 cnpm.org 项目的 cfork 来作进程管理（如果不在 docker 里运行的话，是 pm2 的最好代替方案）
- standard style
- test
- api: 稍稍封装 api 返回，全局中间件 responseWrap
- validator: 稍稍封装 joi 作为参数校难
- cache: 稍稍封装 redis
- mongoDB: 稍稍封装 mongoose
- request: 稍稍封装 request 作为内部 http 协议通信

P.S 其中目录 service 目录只放内部服务接口和事件，不作为传统的业务 service，避免业务 service 写得乱飞，毁掉项目的简洁美 —— 定位为微服务

### 环境依赖
* node >= 6.x
* mongoose
* mongodb server >= 3.2
* 全局 nodemon

### 运行
正式运行 `npm start`: cfork 保证进程意外退出重启， 设置在 `dispatch.js`
开发运行 `npm run dev`： nodemon watch -w ./server/**

测试 `npm test`

代码测试覆盖率 `npm run test-cov`

### 部署
由于使用 docker 容器部署，重新不再是 restart or stop 应用，而是 docker 容器, 配合集群管理 rancher 更佳

### 注意

- 测试环境会清空 test 数据库

