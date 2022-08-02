const fs = require("fs");
const path = require("path");
const http = require("http");

const handlebars = require("handlebars");
const htmlTplBuffer = fs.readFileSync(path.join(__dirname, "./directory.hbs"));
const template = handlebars.compile(htmlTplBuffer.toString());

const mimeTypes = require("mime-types");
const naturalCompare = require("natural-compare");
const defaultConfig = require(path.join(process.cwd(), "server-config.js"));
const handleCache = require('../4-response-content-compress/2-browser-cache');

class StaticServer {
  constructor(options = {}) {
    this.config = Object.assign(defaultConfig, options);
  }

  start() {
    const { root, port } = this.config;

    this.server = http
      .createServer((req, res) => {
        const { url, method, headers } = req;
        // console.log("headers: ", headers);

        if (method !== "GET") {
          res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.end("请使用 GET 方法访问");
          return;
        }

        const filePath = path.join(root, url);

        fs.access(filePath, fs.constants.R_OK, (err) => {
          if (err) {
            res.writeHead(404, {
              "Content-Type": "text/html; charset=utf-8",
            });
            res.end("访问的文件不存在");
          } else {
            const stats = fs.statSync(filePath);
            const direntList = [];

            // 在访问文件有效时，处理缓存响应头
            handleCache(req, res);

            if (stats.isDirectory()) {
              const dir = fs.opendirSync(filePath);
              let dirent = dir.readSync();

              while (dirent) {
                direntList.push({
                  name: dirent.name,
                  path: path.join(url, dirent.name),
                  type: dirent.isDirectory() ? "folder" : "file",
                });
                dirent = dir.readSync();
              }
              dir.close();

              res.setHeader("Content-Type", "text/html; charset=utf-8");

              direntList.sort((x, y) => {
                if (x.type > y.type) {
                  return -1;
                } else if (x.type === y.type) {
                  return naturalCompare(x.name.toLowerCase(), y.name.toLowerCase());
                } else {
                  return 1;
                }
              });

              const html = template({ direntList });
              res.end(html);
            } else {
              res.setHeader("Content-Type", mimeTypes.contentType(path.extname(filePath)));
              fs.createReadStream(filePath).pipe(res);
            }
          }
        });
      })
      .listen(port, () => {
        console.log(`成功启动服务器：http://127.0.0.1:${port}`);
      });
  }

  stop() {
    this.server.close(() => {
      console.log("服务器已关闭");
    });
  }
}

module.exports = StaticServer;
