const fs = require("fs");
const path = require("path");
const http = require("http");
const mimeTypes = require("mime-types");

const server = http.createServer((req, res) => {
  const { url } = req;
  console.log("url: ", url);
  const filePath = path.join(process.cwd(), url);

  try {
    fs.accessSync(filePath, fs.constants.F_OK);
  } catch (err) {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(
      `
      访问的文件不存在！<br>
       <a href="/4-web-application/1-http-server/test-video.mp4">点击访问视频文件</a>
       `
    );
    return;
  }

  const stats = fs.statSync(filePath);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(
      `
      访问的是文件夹，不是文件，请访问具体文件路径！<br>
      <a href="/4-web-application/1-http-server/test-video.mp4">点击访问视频文件</a>
      `
    );
    return;
  }

  fs.access(filePath, fs.constants.R_OK, (err) => {
    res.writeHead(200, {
      "Content-Type": mimeTypes.contentType(path.extname(filePath)),
    });

    // 如果是视频文件 直接播放或下载
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(9520, () => {
  console.log("端口为 9520 的 web 服务器启动成功");
});
