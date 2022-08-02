function handleCache(req, res) {
    const etag = require('etag');
    const fs = require('fs');
    const path = require('path');

    const {url, headers} = req;
    const configPath = path.join(process.cwd(), 'server-config');
    const {root, maxAge, enableEtag, enableLastModified} = require(configPath);
    const filePath = path.join(root, url);

    const stats = fs.statSync(filePath);
    const isFile = stats.isFile();

    if (!isFile) {
        console.log("isFile: ", isFile);
        return;
    }

    if (maxAge) {
      // 浏览器在网络面板取消【禁用缓存】选项，刷新页面会在 指定 maxAge 秒数后，响应码 变成 304
      res.setHeader("Cache-Control", "max-age=" + maxAge);
    }

    if (!enableEtag && !enableLastModified) {
        res.statusCode = 200;
    }

    if (enableEtag) {
        const ifNoneMath = headers['if-none-match'];
        const resEtag = etag(fs.readFileSync(filePath))

        res.setHeader('Etag', resEtag);
        res.statusCode = ifNoneMath === resEtag ? 304 : 200;
    }

    if (enableLastModified) {
        const ifModifiedSince = headers['if-modified-since'];
        const lastModified = fs.statSync(filePath).mtime.toUTCString();

        res.setHeader("Last-Modified", lastModified);
        res.statusCode = ifModifiedSince === lastModified ? 304 : 200;
    }

}

module.exports = handleCache;