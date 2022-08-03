const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const naturalCompare = require("natural-compare");
const mimeTypes = require("mime-types");

const htmlTpl = fs.readFileSync(path.join(__dirname, "./directory.hbs"));
const template = handlebars.compile(htmlTpl.toString());

async function readFile(ctx, next) {
  const { req, res, filePath } = ctx;
  const { url } = req;

  await next();

  fs.access(filePath, fs.constants.R_OK, (err) => {
    const stats = fs.statSync(filePath);
    const direntList = [];

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

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(html);
    } else {
      res.setHeader(
        "Content-Type",
        mimeTypes.contentType(path.extname(filePath))
      );

      if (typeof ctx.body === "string") {
        res.end(ctx.body);
      } else {
        ctx.body.pipe(res);
      }
    }
  });
}

module.exports = readFile;
