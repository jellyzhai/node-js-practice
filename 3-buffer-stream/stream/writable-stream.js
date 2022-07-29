const fs = require('fs');
const path = require('path');

const readableFilePath = path.resolve(process.cwd(), 'README.md')
const writableFilePath = path.resolve(__dirname, 'README-copy.md')

const rs = fs.createReadStream(readableFilePath);
const rw = fs.createWriteStream(writableFilePath);

rs.on('data', chunk => {
    rw.write(chunk, err => {
        console.log('写入数据发生错误：', err)
    })
})

rs.on('end', () => {
    console.log(`${readableFilePath} 文件读取写入 ${writableFilePath} 完成`);
})