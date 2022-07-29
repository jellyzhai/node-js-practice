const { CustomReadableStream } = require("./customReadableStream");

const crd = new CustomReadableStream(5);

/*
// -1- 通过 可读数据流 的 pipe 方法，传入可写流 process.stdout, 将暂停模式的流，改为 流动模式，进行数据读取
crd.pipe(process.stdout);
 */

/*
// -2- 通过监听 可读数据流 的 data 事件，读取数据
crd.on('data', chunk => {
    console.log(chunk.toString())
})

crd.on('error', err => {
    console.log('读取数据发生错误：', err)
})

crd.on('end', () => console.log('读取数据结束'))
 */

/*
setTimeout(() => {
    //   readable.pause() 方法将导致处于流动模式的流停止发射“数据”事件，从而退出流动模式。
    //   任何可用的数据都将保留在内部缓冲区中。
    // 不能暂停 readable 事件回调中，对数据的读取
    crd.pause();

    //   readable.unpipe() 方法分离以前使用 pipe 方法附加的 Writable 流。
    // 如果未指定目标，则所有管道都将被分离。
    // 如果指定了目的地，但没有为其设置管道，则该方法不执行任何操作。
    // 并不能阻止数据的产生 除非调用 process.exit() 退出进程
    crd.unpipe(process.stdout);
}, 2100);
 */


// -3- 通过监听 可读数据流 的 readable 事件，读取数据
// 监听 readable 事件后，data, error, close, end 等事件 不会再 被监听
crd.on('readable', () => {
    const data = crd.read();

    if (data !== null) {
        console.log("typeof data: ", Object.prototype.toString.call(data), '\n', data.toString());
    }
})