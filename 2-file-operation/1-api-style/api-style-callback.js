const path = require('path');
const filePath = path.resolve(__dirname, '../../README.md');

const fs = require('fs');

// 获取文件的基本信息
fs.stat(filePath, (err, stats) => {
    if (err) {
        console.log('报错了：', err);
        return;
    };

    console.log('callback fs.stat', stats)
})
