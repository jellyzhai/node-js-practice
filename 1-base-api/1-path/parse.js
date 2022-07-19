
const path = require('path');

const fileMetadata = path.parse('../../README.md');

console.log('文件元数据：', fileMetadata);
// 文件元数据： {
//     root: '',
//     dir: '../..',
//     base: 'README.md',
//     ext: '.txt',
//     name: 'README'
// }

module.exports = fileMetadata;