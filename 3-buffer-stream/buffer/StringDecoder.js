/*
StringDecoder 在得到编码后，知道宽字节在 utf-8 下占3个字节，所以在处理末尾不全的字节时，会保留到第二次 write()。
目前只能处理UTF-8、Base64 和 UCS-2/UTF-16LE。
 */

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const buff1 = Buffer.from('中文字符串！');

for (let i = 0; i < buff1.length; i += 5) {
  const bc = Buffer.allocUnsafe(5);

  buff1.copy(bc, 0, i);

  // 不使用第3方模块，返回的字符串乱码
//   console.log(bc.toString());

  // 使用第3方模块，解决字符串乱码问题
  console.log(decoder.write(bc));
}