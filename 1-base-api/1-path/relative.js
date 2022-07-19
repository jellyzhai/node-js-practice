const path = require('path');

// path.relative(from, to) 方法根据当前工作目录返回 from 到 to 的相对路径
const filePath = path.relative('/data/orange/test/aaa', '/data/orange/impl/bbb');

console.log('relative filePath: ', filePath);
// relative filePath:  ../../impl/bbb