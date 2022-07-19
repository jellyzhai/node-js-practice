const path = require('path');

// path.join() 使用操作系统规定的分隔符将参数中的 path 片段连接，并且规范化
const filePath = path.join(__dirname, 'parse.js');

console.log('join filePath: ', filePath);
// join filePath:  /home/eser/learn/node-js-practice/1-base-api/1-path/parse.js