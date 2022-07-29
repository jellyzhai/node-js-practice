/*
- 一个围绕 Node.js 流的小型包装器。转换 (Streams2/3) 以避免显式子类化噪声。
- 自从 Node.js 引入了 Simplified Stream Construction 之后，through2 的很多用法就变得多余了。
考虑您是否真的需要使用 through2 或只想使用“可读流”包或核心“流”包（派生自“可读流”）：
*/
const through2 = require("through2");

const fs = require("fs");
const path = require("path");

const readableFilePath = path.resolve(process.cwd(), "README.md");
const writableFilePath = path.resolve(__dirname, "README-through2.md");

fs.createReadStream(readableFilePath)
  .pipe(
    through2(function (chunk, encoding, callback) {
      const data = chunk
        .toString()
        .replaceAll(/[a-z]/g, (matchVal) => matchVal.toUpperCase());

      this.push(data);

      callback();
    })
  )
  .pipe(fs.createWriteStream(writableFilePath))
  .on("finish", () => {
    console.log("finished");
  });
