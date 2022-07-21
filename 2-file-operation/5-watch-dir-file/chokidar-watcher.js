/*
方法和事件
chokidar.watch() 产生一个 FSWatcher 的实例。 FSWatcher 的方法：
.add(path / paths)：添加文件、目录或全局模式以进行跟踪。接受一个字符串数组或一个字符串。
.on(event, callback)：监听 FS 事件。可用事件：add、addDir、change、unlink、unlinkDir、ready、raw、error。
    此外，除了 ready、raw 和 error 之外，所有事件都可用底层事件名称和路径发出。 raw 是内部的，请谨慎使用。
.unwatch(path / paths)：停止监视文件、目录或 glob 模式。接受一个字符串数组或一个字符串。
.close(): async 从被监视的文件中移除所有的监听器。异步，返回 Promise。与 await 一起使用以确保不会发生错误。
.getWatched()：返回一个对象，表示此 FSWatcher 实例正在监视的文件系统上的所有路径。对象的键是所有目录
    （使用绝对路径，除非使用 cwd 选项），值是每个目录中包含的项目名称的数组。
*/
const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs/promises");

const watchedFilePath = path.resolve(__dirname, "./watched-file.txt");
const { getRandomData } = require("../../utils");

const fsWatcher = chokidar.watch(watchedFilePath);

fsWatcher.on("all", (eventName, path, stats) => {
  console.log("监测到文件变化：\n");
  console.log("eventName:", eventName, "\n");
  console.log("path:", path, "\n");
  if (eventName === 'add') {
      console.log("stats:", stats, "\n");
  }
});

function appendFile() {
  fs.appendFile(watchedFilePath, getRandomData())
    .then(() => {
      console.log("--追加内容成功");
    })
    .catch((err) => {
      console.log("--追加内容报错：", err);
    });
}

const intervalId = setInterval(() => {
  appendFile();
}, 500);

setTimeout(() => {
  clearInterval(intervalId);

// 与close方法功能目的一样？？
// fsWatcher.unwatch(watchedFilePath);

  fsWatcher.close().then(() => {
    console.log("关闭监测");
  });
}, 1600);
