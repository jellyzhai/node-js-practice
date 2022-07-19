/*
当 Node.js 进程因以下原因之一即将退出时，则会触发 exit 事件：
● 显式调用 process.exit() 方法
● Node.js 事件循环不再需要执行任何其他工作
此时无法阻止退出事件循环，并且一旦所有 exit 事件的监听器都已完成运行时，Node.js 进程将终止
 */
process.on('exit', exitCode => {
    console.log('exit event occurred, callback exitCode: ', exitCode)
})