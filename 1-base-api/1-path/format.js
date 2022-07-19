const path = require('path');

const fileMetadata = require('./parse');

// 导入同一个模块2次，只执行一次原模块代码
const fileMetadata2 = require('./parse');

const filePath = path.format(fileMetadata);

console.log('format filePath: ', filePath);
// format filePath:  ../../README.md