const fs = require('fs/promises');
const path= require('path');

const options = {
    recursive: true
}
const rmDirPath = path.resolve(__dirname, 'dir-from-mkdir')
console.log(rmDirPath);
/*
 DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true })
 will be removed. Use fs.rm(path, { recursive: true }) instead
*/
// fs.rmdir(rmDirPath, options).then(() =>{
//     console.log(`删除文件夹 ${rmDirPath} 成功`)
// }).catch(console.log);

fs.rm(rmDirPath, options).then(() =>{
    console.log(`删除文件夹 ${rmDirPath} 成功`)
}).catch(err => {
    console.log("err：", err);
    if (err.errno = -2) {
        console.log('待删除的文件夹不存在');
    }
});