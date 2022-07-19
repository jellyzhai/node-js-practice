console.log('process.execPath 属性返回执行当前脚本的 Node 二进制文件的绝对路径: ', process.execPath)

/*
但数组前两个固定
1. 执行当前脚本的 Node 二进制文件的绝对路径
2. 当前执行文件绝对路径
*/
console.log('process.argv 属性返回一个数组，内容是执行脚本时(node test.js arg1 arg2)脚本后面的参数: ', process.argv)

// process.execArgv 属性返回一个数组，成员是命令行执行脚本时，在 Node 命令与脚本文件之间的命令行参数：node --inspect test.js
console.log(process.execArgv)