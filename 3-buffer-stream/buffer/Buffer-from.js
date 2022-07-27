/*
Buffer.from 支持四种参数类型
● Buffer.from(string [, encoding])：返回一个包含给定字符串的 Buffer
● Buffer.from(buffer)：返回给定 Buffer 的一个副本 Buffer
● Buffer.from(array)：返回一个内容包含所提供的字节副本的 Buffer，数组中每一项是一个表示八位字节的数字，所以值必须在 0 ~ 255 之间，否则会取模
● Buffer.from(arrayBuffer)：返回一个与给定的 ArrayBuffer 共享内存的新 Buffer
● Buffer.from(object[, offsetOrEncoding[, length]])：取 object 的 valueOf  或 Symbol.toPrimitive 初始化 Buffer
*/
const buff1 = Buffer.from('a');
const buff2 = Buffer.from('中文');

const groupBuff = Buffer.concat([buff1, buff2])

console.log(groupBuff.toString())
console.log(buff1.length);
console.log(buff2.length);