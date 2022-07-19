const path = require('path')

// 返回 使用 node 命令 执行当前脚本时，所在的工作目录路径
console.log('切换工作目录前的路径：', process.cwd())
/*
eser@eser-PC:~/learn/node-js-practice$ node ./1-base-api/3-process/common-operation-mathod.js
切换工作目录前的路径： /home/eser/learn/node-js-practice
Node.js 进程的内存使用情况:  {
  rss: 32227328,
  heapTotal: 5005312,
  heapUsed: 3143056,
  external: 1080677,
  arrayBuffers: 9898
}
切换工作目录后的路径： /home/eser/learn/node-js-practice/1-base-api
eser@eser-PC:~/learn/node-js-practice$
*/

// 返回 Node.js 进程的内存使用情况
console.log('Node.js 进程的内存使用情况: ', process.memoryUsage())

// 切换工作目录到指定目录
process.chdir(path.resolve(process.cwd(), '1-base-api'))

console.log('切换工作目录后的路径：', process.cwd())

// 退出当前进程
process.exit();