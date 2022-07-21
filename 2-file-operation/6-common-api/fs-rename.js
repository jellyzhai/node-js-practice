const fs = require('fs/promises');
const path = require("path");

const oldFilePath = path.resolve(__dirname, './utils-copy.js')
const newFilePath = path.resolve(__dirname, './utils-copy-rename.js')

fs.rename(oldFilePath, newFilePath).then(() => {
    console.log(`重命名文件从 ${oldFilePath} 到 ${newFilePath} 成功`);
}).catch(err => {
    console.log("重命名文件失败：", err);
});