const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'test.js');

const exist = fs.existsSync(filePath)

console.log(`${filePath} 路径是否存在：`, exist);