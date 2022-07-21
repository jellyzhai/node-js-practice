const fs = require('fs');
const {constants} = fs;
const path = require("path");

const filePath = path.resolve(__dirname, '../../README.md');

fs.access(filePath, constants.F_OK, err => {
    console.log(`${filePath} 可以被进程找到: ${!err}`)
});

fs.access(filePath, constants.R_OK, err => {
    console.log(`${filePath} 可以被进程读取: ${!err}`)
});

fs.access(filePath, constants.W_OK, err => {
    console.log(`${filePath} 可以被进程写入: ${!err}`)
});

fs.access(filePath, constants.X_OK, err => {
    console.log(`${filePath} 可以被进程执行: ${!err}`)
});