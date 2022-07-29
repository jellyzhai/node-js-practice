/*
参考：https://www.yuque.com/sunluyong/node/writable#KJlNz
*/
const { Writable } = require("stream");

class CustomWritableStream extends Writable {

  _write(chunk, encode, callback) {
    process.stdout.write(chunk.toString());
    setImmediate(callback);
  }
}

module.exports = {
  CustomWritableStream,
};