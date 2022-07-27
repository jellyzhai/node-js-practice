/*
Buffer.alloc(size [, fill [, encoding]])
分配一个大小为 size 字节的新 Buffer，如果 fill 为 undefined，则用 0 填充 Buffer
● size <integer> 新 Buffer 的所需长度
● fill <string> | <Buffer> | <Uint8Array> | <integer> 用于预填充新 Buffer 的值。默认值: 0
● encoding <string> 如果 fill 是一个字符串，则这是它的字符编码。默认值: utf8
*/

/*
调用 `Buffer.alloc()` 可能比替代 `Buffer.allocUnsafe()` 慢得多，但确保新创建的 `Buffer` 实例内容
永远不会包含来自先前分配的敏感数据，包括可能尚未分配的数据对于`Buffer`s。
*/
const buff1 = Buffer.alloc(5, 'a');

console.log(buff1)
console.log(buff1.byteLength)
console.log(buff1.length)