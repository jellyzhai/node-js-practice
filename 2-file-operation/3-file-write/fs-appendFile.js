const fs = require("fs/promises");
const path = require("path");

const filePath = path.resolve(__dirname, "append-file.txt");
const data = Buffer.from("use fs.writeFile to write content.\n");
const data2 = Buffer.from("second use fs.writeFile to write content.");

// fs.appendFile(path, data[, options], callback) 将数据追加到文件尾部，如果文件不存在则创建该文件
fs.appendFile(filePath, data)
  .then(() => {
    console.log("第一次追加内容成功");
    return fs.appendFile(filePath, data2);
  })
  .then(() => {
    console.log("第2次追加内容成功");
  })
  .catch((err) => {
    console.log("追加内容出错了：", err);
  });
