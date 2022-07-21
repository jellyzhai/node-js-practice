const fs = require("fs");
const path = require("path");

let filePath = path.resolve(__dirname, "utils-copy.js");

const filePathExist = fs.existsSync(filePath);

if (!filePathExist) {
    require('./fs-copyFile');
    setImmediate(() => {
        console.log(filePath, "存在：", fs.existsSync(filePath));
    })
}

fs.chmod(filePath, 0o744, err => {
    if (err) throw err;
    console.log(filePath, ' 权限修改成功')
});