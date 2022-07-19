const path = require("path");
const filePath = path.resolve(__dirname, "../../README.md");
const fs = require("fs/promises");

/*
stats 对象还提供了几个非常有用的属性、方法获取文件的更多信息，比较常用的有
1. stats.isDirectory()：判断文件是否是个文件夹
2. stats.isFile()：判断文件是否是普通文件
3. stats.isSymbolicLink()：判断文件是否是软链接
4. stats.size：获取文件字节数 (node.js 中，一个中文代表 3 个字符，1个字符 = 1B)
*/
fs.stat(filePath).then(stats => {
  console.log("stats.isDirectory(): ", stats.isDirectory());
  console.log("stats.isFile(): ", stats.isFile());
  console.log("stats.isSymbolicLink(): ", stats.isSymbolicLink());
  console.log("stats.size: ", stats.size);
}).catch(error => {
  console.log('报错了：', error)
})
