process.nextTick(() => {
    console.log('nextTick')
})

setImmediate(() => {
    console.log('setImmediate')
})

Promise.resolve().then(() => {
    console.log('Promise')
})

setTimeout(() => {
    console.log('setTimeout')
})

console.log('first print sync content.')