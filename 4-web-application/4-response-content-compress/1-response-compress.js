/*
HTTP 报文压缩,工作原理主要是

1. 浏览器发送请求时通过 request header accept-encoding 标识支持的压缩格式
2. 服务端从列表中选择一种用来对响应内容压缩，并通过 response header content-encoding 指明使用的格式
3. 浏览器得到响应正文后，依据 content-encoding 进行解压

Node.js 压缩
Node.js 内容压缩主要通过内置的 zlib 模块实现，zlib 提供了几种压缩方法，和 accept-encoding 的对应关系

gzip	zlib.createGzip()
deflate	zlib.createDeflate()
br	    zlib.createBrotliCompress()
*/
const fs = require("fs");
const path = require("path");
const http = require("http");
const { createGzip, createDeflate, createBrotliCompress } = require("zlib");

const mimeTypes = require("mime-types");
const accepts = require("accepts");
const compressible = require("compressible");

const server = http.createServer((req, res) => {
  const { url } = req;

  if (!url.includes("utils.js")) {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(`当前处于根目录, 请访问 <a href='utils.js'>utils.js</a>`);
  } else {
    const filePath = path.join(process.cwd(), url);

    let isFindable = true;

    try {
      fs.accessSync(filePath, fs.constants.F_OK);
    } catch {
      isFindable = false;
    }

    if (!isFindable) {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(`当前路径，存在：${isFindable}`);
      return;
    }

    const stats = fs.statSync(filePath);
    let isReadable = true;

    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch {
      isReadable = false;
    }

    if (!stats.isFile() || !isReadable) {
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(`当前路径 是文件：${stats.isFile()}, 可读：${isReadable}`);
    } else {
      const isCompressible = compressible(
        mimeTypes.contentType(path.extname(filePath))
      );
      const encodings = accepts(req).encodings();
      const compressMethodInsMap = {
        gzip: createGzip(),
        deflate: createDeflate(),
        br: createBrotliCompress(),
      };

      if (isCompressible) {
        console.log("isCompressible: ", isCompressible);

        // 可在浏览器响应头中看到结果，不指定 内容压缩格式，页面会显示乱码
        res.writeHead(200, {
          "Content-Type": mimeTypes.contentType(path.extname(filePath)),
          "Content-Encoding": encodings[0],
        });

        fs.createReadStream(filePath)
          .pipe(compressMethodInsMap[encodings[0]])
          .pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Type": mimeTypes.contentType(path.extname(filePath)),
        });
        fs.createReadStream(filePath).pipe(res);
      }
    }
  }
});

server.listen(9521, () => {
  console.log("服务器端口 9521 正被监听中");
});

server.on("error", (err) => {
  console.log("发生了错误：", err);
});
