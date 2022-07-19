/*
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
event loop 的每个阶段都有一个任务队列，当 event loop 进入给定的阶段时，将执行该阶段的任务队列，
直到队列清空或执行的回调达到系统上限后，才会转入下一个阶段，当所有阶段被顺序执行一次后，称 event loop 完成了一个 tick.

异步操作都被放到了下一个 event loop tick 中，process.nextTick 在进入下一次 event loop tick 之前执行，
所以肯定在其它异步操作之前
*/

/*
各个阶段主要任务
1. timers：执行 setTimeout、setInterval 回调
2. pending callbacks：执行 I/O（文件、网络等） 回调
3. idle, prepare：仅供系统内部调用
4. poll：获取新的 I/O 事件，执行相关回调，在适当条件下会阻塞 node
5. check：setImmediate 回调在此阶段执行
6. close callbacks：执行 socket 等的 close 事件回调
日常开发中绝大部分异步任务都是在 timers、poll、check 阶段处理的
*/

/*
timers
Node.js 会在 timers 阶段检查是否有过期的 timer，如果存在则把回调放到 timer 队列中等待执行，
Node.js 使用单线程，受限于主线程空闲情况和机器其它进程影响，并不能保证 timer 按照精确时间执行
定时器主要有两种
1. Immediate
2. Timeout
Immediate 类型的计时器回调会在 check 阶段被调用，Timeout 计时器会在设定的时间过期后尽快的调用回调
*/

/*
poll
poll 阶段主要有两个任务
1. 计算应该阻塞和轮询 I/O 的时间
2. 然后，处理 poll 队列里的事件

当event loop进入 poll 阶段且没有被调度的计时器时
● 如果 poll 队列不是空的 ，event loop 将循环访问回调队列并同步执行，直到队列已用尽或者达到了系统或达到最大回调数
● 如果 poll 队列是空的
  ○ 如果有 setImmediate() 任务，event loop 会在结束 poll 阶段后进入 check 阶段
  ○ 如果没有 setImmediate()任务，event loop 阻塞在 poll 阶段等待回调被添加到队列中，然后立即执行

一旦 poll 队列为空，event loop 将检查 timer 队列是否为空，如果非空则进入下一轮 event loop

上面提到了如果在不同的 I/O 里，不能确定 setTimeout 和 setImmediate 的执行顺序，但如果 setTimeout 和 setImmediate
在一个 I/O 回调里，肯定是 setImmediate 先执行，因为在 poll 阶段检查到有 setImmediate() 任务，event loop 直接进入
 check 阶段执行 setImmediate 回调
*/

/*
为什么 Promise.then 比 setTimeout 早一些
前端同学肯定都听说过 micoTask 和 macroTask，Promise.then 属于 microTask，在浏览器环境下 microTask 任务会在每个
 macroTask 执行最末端调用

在 Node.js 环境下 microTask 会在每个阶段完成之前调用，也就是每个阶段执行最后都会执行一下 microTask 队列
*/

/*
setImmediate VS process.nextTick
任何时候调用 process.nextTick()，nextTick 会在 event loop 之前执行，直到 nextTick 队列被清空才会进入到
下一 event loop，如果出现 process.nextTick 的递归调用程序没有被正确结束，那么 IO 的回调将没有机会被执行.

官方推荐大部分时候应该使用 setImmediate，同时对 process.nextTick 的最大调用堆栈做了限制，但 process.nextTick
 的调用机制确实也能为我们解决一些棘手的问题:
1. 允许用户在 even loop 开始之前 处理异常、执行清理任务
2. 允许回调在调用栈 unwind 之后，下次 event loop 开始之前执行
*/

const fs = require('fs');
const path = require('path');

const readmeFilePath = path.resolve(__dirname, '../../README.md');

fs.readFile(readmeFilePath, (err, bufferData) => {
    if (err) return;
    console.log('read content: ', bufferData.toString())
})

let i = 0;

function add() {
    if (i++ < 10) {
        console.log((`nextTick: ${i}`))

        // process.nextTick 的递归调用程序没有被正确结束，那么 IO 的回调将没有机会被执行.
        // process.nextTick(add);

        setImmediate(add);
    }
}
add();

process.on('uncaughtException', err => {
    console.log('uncaughtException: ', err)
})