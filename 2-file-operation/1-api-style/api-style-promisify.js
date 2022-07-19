const path = require('path');
const util = require('util');
const filePath = path.resolve(__dirname, '../../README.md');

const fs = require('fs');
const stat = util.promisify(fs.stat)

// 获取文件的基本信息
stat(filePath).then(stats => {
    console.log('util.promisify(fs.stat): ', stats)
}).catch(err => {
    if (err) {
        console.log('报错了：', err);
    };
})
