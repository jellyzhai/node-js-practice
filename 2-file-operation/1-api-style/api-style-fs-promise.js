const path = require('path');
const filePath = path.resolve(__dirname, '../../README.md');

const fs = require('fs/promises');

// 获取文件的基本信息
fs.stat(filePath).then(stats => {
    console.log('fs/promises fs.stat: ', stats)
}).catch(err => {
    if (err) {
        console.log('报错了：', err);
    };
})
