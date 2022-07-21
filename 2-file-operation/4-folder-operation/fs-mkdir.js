const fs = require('fs');

// const path = require("path");
// const dirPath = path.resolve(__dirname + "/dir-from-mkdir");

const dirPath = __dirname + "/dir-from-mkdir/sub-dir";
const options = {
    recursive: true
};

/*
fs.mkdir(path[, options], callback) 创建目录
options
● recursive：默认值 false，设置为 true 时候相当命令 mkdir -p 会把不存在的目录创建
● mode：默认值 0o777，Windows 不支持
*/
fs.mkdir(dirPath, options, err => {
  if (err) throw err;
  console.log(`创建文件文件夹 ${dirPath} 成功`);
});