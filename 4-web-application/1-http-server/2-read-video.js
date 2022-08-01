const fs = require('fs');
const path = require("path");
const http = require("http");
const mimeTypes = require("mime-types");



const server = http.createServer((req, res) => {
    const {url} = req;
    const filePath = path.join(process.cwd(), url);

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end('访问的文件不存在！')
        } else {
          res.writeHead(200, {
            "Content-Type": mimeTypes.contentType(path.extname(filePath)),
          });

          // 如果是视频文件 直接下载
          fs.createReadStream(filePath).pipe(res);
        }
    })
})

server.listen(9520, () => {
    console.log("端口为 9520 的 web 服务器启动成功");
})
