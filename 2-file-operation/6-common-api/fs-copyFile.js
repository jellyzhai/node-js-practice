const fs = require('fs/promises');
const path = require("path");

const srcPath = path.resolve(process.cwd(), 'utils.js');
const destPath = path.resolve(__dirname, 'utils-copy.js');

fs.copyFile(srcPath, destPath).then(() => {
    console.log(`复制文件从 ${srcPath} 到 ${destPath} 成功`);
}).catch(err => {
    console.log('复制文件失败：', err)
});