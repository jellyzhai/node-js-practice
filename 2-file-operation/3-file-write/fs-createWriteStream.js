const fs = require('fs');
const path = require('path');

const readfilePath = path.resolve(__dirname, "./append-file.txt");
const writefilePath = path.resolve(__dirname, "./append-file-copy.txt");

/*
fs.createWriteStream(path[, options]) 用来创建一个可写的文件流，options 和 fs.createReadStream 几乎相同
options（比较常用的有）
● fd: 默认值 null，如果指定了 fd，则会忽略 path 参数，使用指定的文件描述符（不会再次触发 open 事件）
● mode：默认值 0o666
● autoClose: 默认值: true，当 'error' 或 'finish' 事件时，文件描述符会被自动地关闭
● start: 开始写入文件的位置，不设置默认覆盖
*/
fs.createReadStream(readfilePath).pipe(fs.createWriteStream(writefilePath));