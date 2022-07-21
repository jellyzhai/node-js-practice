const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const write = promisify(fs.write);

const bufferData = Buffer.from("string from buffer.\n");
const strData = "hi there.";

const writableFilePath = path.resolve(__dirname, "./write.txt");
const fd = fs.openSync(writableFilePath, "w");

/*
fs.write 有两种重载
1. fs.write(fd, buffer[, offset[, length[, position]]], callback)：参数含义和 fs.read 几乎相同
2. fs.write(fd, string[, position[, encoding]], callback)：只能把字符串内容全部写入文件
两个的区别就是使用 buffer 可以只写入 buffer 中 offset ~ length + offset 的内容，
而使用字符串只能把字符串内容 *全部* 写入文件
*/
write(fd, bufferData)
  .then(() => {
    console.log("写入 buffer 数据完成");
    return write(fd, strData);
  })
  .then(() => {
    console.log("写入 string 数据完成");
  })
  .catch((err) => {
    console.log("写入文件发生错误：", err);
  })
  .finally(() => {
    fs.close(fd);
    console.log("写入文件完成，关闭文件描述符：", fd);
  });
