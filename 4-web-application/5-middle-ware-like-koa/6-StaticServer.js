const path = require("path");
const http = require("http");

const onionModel = require("./1-onionModel");
const error = require("./2-middleware-error");
const readFile = require("./3-middle-read-file");
const compressFile = require("./4-middle-compress-file");
const cacheFile = require("./5-middle-cache-file");
const defaultConfig = require(path.join(process.cwd(), "server-config.js"));

class StaticServer {
  constructor(options = {}) {
    this.config = Object.assign(defaultConfig, options);
  }

  start() {
    const { root, port } = this.config;

    this.server = http
      .createServer((req, res) => {
        const { url, headers } = req;
        // console.log("headers: ", headers);
        const filePath = path.join(root, url);
        const ctx = { req, res, filePath, config: this.config };

        onionModel([error, readFile, compressFile, cacheFile])(ctx);
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
