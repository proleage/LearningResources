const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, '/db.json')); // 你的json文件路径
const middlewares = jsonServer.defaults();

server.use(middlewares);

//禁用
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // 代理设置
// server.use('/onebox/exchange/currency', createProxyMiddleware({
//     target: 'http://op.juhe.cn',
//     changeOrigin: true,
//     pathRewrite: {
//         '^/onebox/exchange/currency': '/onebox/exchange/currency', // 重写请求路径
//     },
// }));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
});