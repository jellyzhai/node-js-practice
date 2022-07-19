/*
当前进程抛出一个没有被捕捉的错误时，会触发uncaughtException事件
 */
process.on('uncaughtException', error => {
    console.log('uncaughtException event occurred, callback error: ', error)
});

throw new Error('custom error jelly')