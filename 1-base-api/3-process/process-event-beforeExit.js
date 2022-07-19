/*
当 Node.js 清空其事件循环并且没有其他工作要安排时，会触发 beforeExit 事件。
通常 Node.js 进程将在没有调度工作时退出，但是在 beforeExit 事件上注册的监听器可以进行异步调用使 Node.js 进程继续
 */
process.on('beforeExit', exitCode => {
    Promise.resolve('hi').then(str => {
        console.log(`executed before exit event, Promise.resolve: `, str)
    });
    console.log('beforeExit event occurred, callback error: ', exitCode)
});

process.on('exit', exitCode => {
    console.log('exit event occurred, callback error: ', exitCode)
});

console.log('first print')