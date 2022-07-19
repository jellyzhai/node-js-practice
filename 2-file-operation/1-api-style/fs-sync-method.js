const path = require("path");
const filePath = path.resolve(__dirname, "../../README.md");
const fs = require("fs");

/*
很多时候需要读写文件后才能进行某些操作，在没有性能问题的场景可以使用 fs 提供的同步函数来降低代码复杂度
fs 为大部分方法提供了一个同步版本，命名规则是方法名称后面添加 Sync ，比如 fs.readFile 和 fs.readFileSync，
stat 方法也有对应的同步版本
*/
try {
  const stats = fs.statSync(filePath);
  console.log("同步读取文件状态 fs.statSync", stats);
} catch (error) {
  console.log("报错了：", error);
}
