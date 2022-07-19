const path = require('path');

// path.basename: 返回 path 最后一部分
console.log(path.basename(__filename))

// path.delimiter: 返回操作系统路径界定符，Windows 返回 ; POSIX 返回 :
console.log(path.delimiter)

// path.dirname: 返回文件目录名
console.log(path.dirname(__filename))

// path.extname: 返回路径的拓展名（jquery.min.js 拓展名是 .js）
console.log(path.extname(__filename))

console.log(path.isAbsolute(__dirname))

// path.sep: 返回路径分隔符，Windows 返回 \ POSIX 返回 /
console.log(path.sep)