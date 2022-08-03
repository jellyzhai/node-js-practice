const fs = require('fs');

// 中间件是一个 async 函数
async function error (ctx, next) {
    const {req, res, filePath} = ctx;
    const {method, url} = req;

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (method !== 'GET') {
        res.end('请使用 GET 方法使用')
    } else {
        try {
            fs.accessSync(filePath, fs.constants.R_OK);
            await next();
        } catch (err) {
            res.end(`访问的 ${ url } 地址不存在`);
        }
    }
}

module.exports = error;