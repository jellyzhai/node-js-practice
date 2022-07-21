const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../../README.md");

const rs = fs.createReadStream(filePath, { start: 2 });

rs.on("open", (fd) => {
  console.log("打开的文件描述符：", fd);
});

rs.on("ready", () => {
  console.log("文件已准备");
});

rs.on("data", (chunk) => {
  console.log("读取到的文件内容：", chunk.toString());
});

rs.on("end", () => {
  console.log("读取文件结束");
});

rs.on("close", () => {
  console.log("关闭读取文件描述符");
});

rs.on("error", (error) => {
  console.log("读取文件发生错误：", error);
});
