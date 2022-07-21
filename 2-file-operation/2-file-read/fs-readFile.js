const path = require("path");
const filePath = path.resolve(__dirname, "../../README.md");

/*
- fs.readFile(path[, options], callback) 是最常用的读取文件方法，用于 *异步* 读取文件的 *全部* 内容，
在大部分读取小文件的时候 都应该使用这个方法。
- 如果 options 是字符串，则它指定字符编码：fs.readFile('./test.txt', 'utf8', callback);
- options 可以设置为对象：fs.readFile('./test.txt', { encoding: 'utf8', flag: 'r' }, callback);
*/
// const fs = require("fs");
// fs.readFile(filePath, (err, buffer) => {
//     if (err) {
//         console.log('报错了：', err);
//         return;
//     }
//     console.log(buffer.toString())
// })

/*
function readFile(
    path: PathLike | FileHandle,
    options?:
    | ({
        encoding?: null | undefined;
        flag?: OpenMode | undefined;
    } & Abortable)
    | null
    ): Promise<Buffer>;
*/
const fs = require("fs/promises");
fs.readFile(filePath)
  .then((buffer) => {
    console.log(buffer.toString());
  })
  .catch((err) => {
    console.log("报错了：", err);
  });

console.log(filePath);
