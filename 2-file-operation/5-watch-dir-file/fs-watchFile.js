const fs = require("fs");
const path = require("path");

const watchedFilePath = path.resolve(__dirname, "./watched-file.txt");
const { getRandomData } = require("../../utils");

/*
fs.watchFile(filename[, options], listener) 用于监视文件变化
1. filename
2. options
  ○ biginit：默认值 false，指定回调 stat 中的数值是否为 biginit 类型
  ○ persistent：默认值 true，当文件正在被监视时，进程是否应该继续运行
  ○ interval：默认值 5007，用来指定轮询频率（ms）
3. listener(currentStats, previousStats)：listener 有两个参数，当前的 stat 对象和之前的 stat 对象

要在修改文件时收到通知，则需要比较 curr.mtime 和 prev.mtime
 */
fs.watchFile(watchedFilePath, {interval: 500}, (curr, prev) => {
  console.log("监测的文件变化：\n");
  console.log("curr：\n", curr.mtime);
  console.log("prev\n", prev.mtime);
});

const intervalId = setInterval(() => {
  fs.appendFile(watchedFilePath, getRandomData(), (err) => {
    if (err) throw err;
    console.log("追加数据完成");
  });
}, 500);

/*
fs.unwatchFile(filename[, listener]) 停止监视 filename 的变化，如果指定了 listener，则仅移除此特定监听器，
否则将移除所有监听器，从而停止监视 filename
*/
setTimeout(() => {
  clearInterval(intervalId);
  fs.unwatchFile(watchedFilePath);
}, 2000);

process.on('beforeExit', () => {
  console.log("beforeExit", globalThis);
})

process.on('exit', () => {
  console.log("exit", globalThis);
})