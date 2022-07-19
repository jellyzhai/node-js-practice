const path = require('path');

// path.resolve() 方法将路径或路径片段的序列解析为绝对路径
const filePath1 = path.resolve('/foo/bar', './baz');

const filePath2 = path.resolve('/foo/bar', '/tmp/baz');

const filePath3 = path.resolve('files', 'static_files/png', '../gif/smile.gif');

console.log('resolve filePath: ', filePath1, filePath2, filePath3);
// resolve filePath:  /foo/bar/baz /tmp/baz /home/eser/learn/node-js-practice/files/static_files/gif/smile.gif