const etag = require("etag");
const fs = require("fs");
const path = require("path");

async function handleCache(ctx, next) {
  const { req, res, filePath } = ctx;
  const { headers } = req;
  const { maxAge, enableEtag, enableLastModified } = ctx.config;

  await next();

  const stats = fs.statSync(filePath);
  const isFile = stats.isFile();
  console.log("isFile: ", isFile);

  if (!isFile) {
    return;
  }

  if (maxAge) {
    // 浏览器在网络面板取消【禁用缓存】选项，刷新页面会在 指定 maxAge 秒数后，响应码 变成 304
    res.setHeader("Cache-Control", "max-age=" + maxAge);
  }

  if (enableEtag) {
    const ifNoneMath = headers["if-none-match"];

    // 可以改成异步读取文件内容了，但实际应用同样不会这么做，一般有离线任务计算
    const content = fs.readFileSync(filePath);
    const resEtag = etag(content);

    res.setHeader("Etag", resEtag);
    res.statusCode = ifNoneMath === resEtag ? 304 : 200;
  }

  if (enableLastModified) {
    const ifModifiedSince = headers["if-modified-since"];
    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime.toUTCString();

    res.setHeader("Last-Modified", lastModified);
    res.statusCode = ifModifiedSince === lastModified ? 304 : 200;
  }
}

module.exports = handleCache;
