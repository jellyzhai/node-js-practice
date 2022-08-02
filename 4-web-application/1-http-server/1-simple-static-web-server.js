const fs = require("fs");
const http = require("http");
const path = require("path");
const mimeTypes = require("mime-types");

const rootPath = process.cwd();

const server = http.createServer((req, res) => {
  const { url } = req;
  const filePath = path.join(rootPath, url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("访问的文件不存在!");
    } else {
      res.writeHead(200, {
        "Content-Type": mimeTypes.contentType(path.extname(filePath)),
      });

      // end 方法包含最后一个 write 方法的功能
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(9520, () => {
  console.log("静态 web 服务器已启动，监听端口为 9520");
});
