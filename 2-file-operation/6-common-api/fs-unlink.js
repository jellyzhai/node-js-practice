const fs = require("fs");
const path = require("path");
const { sleep } = require(process.cwd() + "/utils.js");

// const setTimeout = require('timers/promises');

let filePath = path.resolve(__dirname, "./utils-copy.js");
const filePathExist = fs.existsSync(filePath);

if (!filePathExist) {
  require("./fs-copyFile");
  console.log("复制后的文件路径：", filePath);
}

sleep(2000)
  .then(() => {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log("删除文件 ", filePath, " 成功");
    });
  })
  .then(() => {
    filePath = path.resolve(__dirname, "./utils-copy-rename.js");
    if (!fs.existsSync(filePath)) return;

    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log("删除文件 ", filePath, " 成功");
    });
  });
