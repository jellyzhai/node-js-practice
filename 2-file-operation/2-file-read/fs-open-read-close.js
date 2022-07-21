const fs = require("fs");
const path = require("path");
const filePath = path.resolve("README.md");
const promisify = require("util").promisify;
const open = promisify(fs.open);
const read = promisify(fs.read);
const close = promisify(fs.close);

// 除非希望精确控制，否则不要使用这种方式读取文件，手工控制缓冲区、文件位置指针很容易出现各种意外状况
async function readFile() {
  const fd = await open(filePath);
  console.log("文件描述符是：", fd);

  const readConfig = {
    position: 2,
    length: 4,
  };
  const { bytesRead, buffer } = await read(fd, readConfig);
  console.log("\n第一次读取的字符数：", bytesRead);
  console.log("\n第一次读取的内容：", buffer.toString());

  const { bytesRead: bytesRead2, buffer: buffer2 } = await read(fd, {length: 2});
  console.log("\n不指定位置，第2次读取的字符数：", bytesRead2);
  console.log("\n不指定位置，第2次读取的内容：", buffer2.toString());

  const { bytesRead: bytesRead3, buffer: buffer3 } = await read(fd, {length: 2});
  console.log("\n不指定位置，第3次读取的字符数：", bytesRead3);
  console.log("\n不指定位置，第3次读取的内容：", buffer3.toString());

  await close(fd);
  console.log("\n关闭文件描述符");
}
readFile();
console.log('读取的文件路径：', filePath);
