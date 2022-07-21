const fs = require("fs/promises");

const dirPath = process.cwd();

/*
fs.readdir(path[, options], callback) 读取目录的内容，回调有两个参数 (err, files)，
其中 files 是目录中的文件名的数组（不包括 '.' 和 '..'）
options
● encoding：默认值 utf8，如果 encoding 设置为 'buffer'，则返回的文件名是 Buffer 对象
● withFileTypes：默认值 false，设置为 true 后回调函数 files 数组将包含 fs.Dirent 对象
*/
async function readDir(dirPath) {
  let options;
//   options = {
//     withFileTypes: true,
//   };

  const files = await fs.readdir(dirPath, options)

  for (const file of files) {
    console.log(file, `: ${typeof file}`);
  }
}
readDir(dirPath);
