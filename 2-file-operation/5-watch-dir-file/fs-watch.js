const fs = require("fs");
const util = require("util");
const promisify = util.promisify;
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

const { getRandomData } = require("../../utils");

const filePath = __dirname + "/watched-file.txt";

let options;

writeFile(filePath, getRandomData())
  .then(() => {
    console.log("写入数据成功");
  })
  .catch((err) => {
    console.log("写入数据失败：", err);
  });

// linux 平台不支持递归检测
// options = {
//     recursive: true
// };

/*
fs.watch(filename[, options][, listener]) 监视文件变化，返回 fs.FSWatcher 实例
1. filename：文件或文件夹路径
2. options
  ○ encoding
  ○ recursive：默认值 false，应该监视所有子目录，还是仅监视当前目录，仅在 macOS 和 Windows 上支持
  ○ persistent：默认值 true，指示如果文件已正被监视，进程是否应继续运行
  ○ listener(eventType, filename)：文件变化回调函数

eventType 主要是 rename 和 change ，在大多数平台上，文件在目录中出现或消失时触发 'rename' 事件，在 Windows 上，
如果监视的目录被移动或重命名，则不会触发任何事件，当监视的目录被删除时，则报告 EPERM 错误
*/

// 即使 保存一下文件，也会触发监测回调函数
fs.watch(filePath, options, (eventType, fileName) => {
  console.log(
    `监听到 ${filePath} 文件变化：\n`,
    "eventType: ",
    eventType,
    "\n",
    "fileName：",
    fileName
  );
});

const intervalId = setInterval(() => {
  appendData(filePath);
}, 500);

const timeoutId = setTimeout(() => {
  clearInterval(intervalId);
  process.exit();
}, 2000);

process.on("exit", () => {
  clearTimeout(timeoutId);
  console.log("清理定时器，进程结束。");
});

// function getRandomData() {
//   return "生成的随机数：" + Math.random() + "\n";
// }

function appendData(filePath) {
  appendFile(filePath, getRandomData())
    .then(() => {
      console.log("追加数据成功");
    })
    .catch((err) => {
      console.log("追加数据失败：", err);
    });
}
