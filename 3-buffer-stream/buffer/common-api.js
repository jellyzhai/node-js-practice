const buff1 = Buffer.from('hi 你好！')

// 返回 内存为此 Buffer 实例所申请的字节数，并不是 Buffer 实例内容的字节数
console.log("buff1.length: ", buff1.length);

console.log('Buffer.isBuffer("hi"): ', Buffer.isBuffer("hi"));

console.log('Buffer.isEncoding("hi"): ', Buffer.isEncoding("utf8"));

// buf.indexOf：和数组的 indexOf 类似，返回某字符串、acsii 码或者 buf 在改 buf 中的位置