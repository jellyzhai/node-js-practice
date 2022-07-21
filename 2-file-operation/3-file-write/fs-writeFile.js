const fs = require("fs/promises");
const path = require("path");

const writableFilePath = path.resolve(__dirname, "write-file.txt");
const writableContent = Buffer.from("use fs.writeFile to write content.");

/*
fs.writeFile(file, data[, options], callback)
1. file：文件名或文件描述符
2. data：常用的主要是 string 和 buffer
3. callback(err)
当 file 是文件名时，则异步地写入数据到文件，如果文件已存在，则覆盖文件内容
*/
fs.writeFile(writableFilePath, writableContent)
  .then(() => {
    console.log("内容写入成功");
  })
  .catch((err) => {
    console.log("写入文件出错了：", err);
  });
