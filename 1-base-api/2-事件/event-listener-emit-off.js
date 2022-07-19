const EventEmitter = require('events');

const eventEmitterIns = new EventEmitter();

const arrowFun = () => {
    console.log('once this: ', this); // this:  {}
};
eventEmitterIns.once('fire', arrowFun);

const declareFun = function() {
    console.log('multiple EventEmitter this: ', this); // EventEmitter this:  EventEmitter {...}
};
eventEmitterIns.on('fire', declareFun)

// 会将监听器函数 放到 监听器数组的第一个位置，首先调用
eventEmitterIns.prependListener('fire', function (...args) {
    console.log('multiple first listener args: ', args);
});

// 触发事件发射器对象 监听的事件，并传入参数
eventEmitterIns.emit('fire', 1,2,3,4,5);

// 只能卸载事件的一个监听器函数
eventEmitterIns.off('fire', arrowFun);

eventEmitterIns.emit('fire', 6,7,8);

eventEmitterIns.on('rain', () => {
    console.log('it`s raining')
});

eventEmitterIns.emit('rain')

// 返回事件发射器对象的所有事件名称
console.log('eventEmitterIns.eventNames(): ', eventEmitterIns.eventNames())

// 返回指定事件上注册的 所有监听器函数
console.log("eventEmitterIns.listeners('fire'): ", eventEmitterIns.listeners('fire'));

// 删除 指定事件上注册的 所有监听器函数
eventEmitterIns.eventNames().forEach(eventName => eventEmitterIns.removeAllListeners(eventName))

eventEmitterIns.emit('fire', 110);

eventEmitterIns.emit('rain')