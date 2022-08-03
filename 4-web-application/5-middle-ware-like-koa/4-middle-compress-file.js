const fs = require("fs");
const path = require("path");
const http = require("http");
const { createGzip, createDeflate, createBrotliCompress } = require("zlib");

const mimeTypes = require("mime-types");
const accepts = require("accepts");
const compressible = require("compressible");

async function compress(ctx, next) {
  const { req, res, filePath } = ctx;
  const { url } = req;

  const contentType = mimeTypes.contentType(path.extname(url));
  const isCompressible = compressible(contentType);
  console.log("isCompressible: ", isCompressible);
  const encodings = accepts(req).encodings();
  const compressMethodInsMap = {
    gzip: createGzip(),
    deflate: createDeflate(),
    br: createBrotliCompress(),
  };

  await next();

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    return;
  }

  // 可在浏览器响应头中看到结果，响应头不指定 内容压缩格式，页面会显示乱码
  res.setHeader("Content-Type", contentType);

  if (isCompressible) {

    res.setHeader("Content-Encoding", encodings[0]);
    res.removeHeader("Content-Length");

    ctx.body = fs
      .createReadStream(filePath)
      .pipe(compressMethodInsMap[encodings[0]]);
  } else {
    ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = compress;
