const path = require('path');

// path.normalize() 方法规范化给定的 path，解析 ..   和 .
const filePath = path.normalize('/foo/bar//baz/asdf/quux/..')

console.log('normalize filePath: ', filePath);
// normalize filePath:  /foo/bar/baz/asdf